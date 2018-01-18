import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../_services/authentication.service';
import { AlertService } from '../_services/alert.service';
import { Http } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-facebook-login-response',
  templateUrl: './facebook-login-response.component.html',
  styleUrls: ['./facebook-login-response.component.scss']
})
export class FacebookLoginResponseComponent implements OnInit {

  returnUrl: string;

  accessToken: string = '';
  exipresIn: number;

  constructor(private route: ActivatedRoute, private alertService: AlertService, private router: Router, private http: Http,
    private authService: AuthenticationService) {

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/home';

    //console.log('constructor');
    this.accessToken = this.getParameterByName("access_token", window.location.href);

    if (this.accessToken != '') {
      this.authService.facebookLogin(this.accessToken)
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

    //this.route.queryParams.subscribe(params => {
    //  this.accessToken = params['access_token'];
    //  this.exipresIn = params['expires_in'];
    //  console.log('#access_token: ' + params['#access_token']);
    //});

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
