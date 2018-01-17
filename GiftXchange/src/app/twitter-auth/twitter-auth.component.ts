import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../_services/authentication.service';
import { AlertService } from '../_services/alert.service';
import { Http } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-twitter-auth',
  templateUrl: './twitter-auth.component.html',
  styleUrls: ['./twitter-auth.component.scss']
})
export class TwitterAuthComponent implements OnInit {

  returnUrl: string = '';

  authToken: string = '';
  authVerifier: string = '';


  constructor(private route: ActivatedRoute, private alertService: AlertService, private router: Router, private http: Http,
    private authService: AuthenticationService) {

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

    this.authToken = this.getParameterByName('oauth_token', window.location.href);
    this.authVerifier = this.getParameterByName('oauth_verifier', window.location.href);

    alert('token: ' + this.authToken);

    if (this.authToken != '' && this.authVerifier != null) {
      this.authService.twitterAccessToken(this.authToken, this.authVerifier).
        subscribe(
        data => {
          console.log('success! ' + data);
        },
        error => {
          console.log('error' + error);
        }
        );
    }

    if (this.authToken != '') {
      this.authService.twitterLogin(this.authToken)
        .subscribe(
        data => {
          if (data == true) {
            window.opener.document.location.href = this.returnUrl;
            //window.parent.focus();
            window.close();
          }
        },
        error => {
          this.alertService.error('There was an error: ' + error, false);
        }
        );
    }


  }

  getParameterByName(name: string, url: string) {
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&#]" + name + "(=([^&#]*)|&|#|$)"),
      results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
  }

  ngOnInit() {

  }

}
