import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../_services/authentication.service';
import { AlertService } from '../_services/alert.service';
import { AppConfig } from '../app.config';

declare var window: any;

@Component({
  selector: 'app-twitter-login-response',
  templateUrl: './twitter-login-response.component.html',
  styleUrls: ['./twitter-login-response.component.scss']
})
export class TwitterLoginResponseComponent implements OnInit {

  private authWindow: Window;
  token: string = '';
  tokenSecret: string = '';

  siteUrl: string = '';

  constructor(private authService: AuthenticationService, private alertService: AlertService, private appConfig:AppConfig) {
    this.siteUrl = this.appConfig.urlRoot();
  }

  ngOnInit() {
    this.authService.twitterLoginSetup()
      .subscribe(
      data => {
        this.token = this.authService.getTwitterRequestToken();
        this.tokenSecret = this.authService.getTwitterTokenSecret();
      },
      error => {
        this.alertService.error('there was an error: ' + error, false);
      }
      );
  }

  openLogin() {
    this.authWindow = window.open('https://api.twitter.com/oauth/authenticate?oauth_token=' + this.token + '&callback_url=' + this.siteUrl + '/twitter-auth', null, 'width=600,height=400');
  }

}
