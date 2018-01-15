import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../_services/authentication.service';
import { AlertService } from '../_services/alert.service';
import { Http } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import { AppConfig } from '../app.config';


declare var window: any;
declare var FB: any;

@Component({
  selector: 'facebook-signin',
  templateUrl: './facebook-signin.component.html',
  styleUrls: ['./facebook-signin.component.scss']
})
export class FacebookSigninComponent implements OnInit {

  returnUrl: string;
  private authWindow: Window;

  siteUrl: string = '';

  launchFbLogin() {
    // launch facebook login dialog
    this.authWindow = window.open(`https://www.facebook.com/v2.11/dialog/oauth?&response_type=token&display=popup&client_id=189190551632736&display=popup&redirect_uri={this.siteUrl}/facebook-login&scope=email`, null, 'width=600,height=400');
  }

  constructor(private route: ActivatedRoute, private alertService: AlertService, private router: Router, private http: Http,
    private authService: AuthenticationService, private appConfig: AppConfig) {

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

    this.siteUrl = this.appConfig.urlRoot();

    console.log('siteUrl: ' + this.siteUrl);
    
  }

  ngOnInit() {

  }

}
