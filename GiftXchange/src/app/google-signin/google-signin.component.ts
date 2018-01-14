import { Component, ElementRef, AfterViewInit } from '@angular/core';
declare const gapi: any;

import { AuthenticationService } from '../_services/authentication.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService } from '../_services/alert.service';

@Component({
  selector: 'google-signin',
  templateUrl: './google-signin.component.html',
  styleUrls: ['./google-signin.component.scss']
})
export class GoogleSigninComponent implements AfterViewInit {

  private clientId: string = '609698562138-k40il43lrugkc890rjehpkvjovqrbu8u.apps.googleusercontent.com';
  private clientSecret: string = 'YZL1AIL_CP_tIL8gZFpRxq8Q';

  returnUrl: string;

  private scope = [
    'profile',
    'email',
    'https://www.googleapis.com/auth/plus.me',
    'https://www.googleapis.com/auth/contacts.readonly',
    'https://www.googleapis.com/auth/admin.directory.user.readonly'
  ].join(' ');

  public auth2: any;
  public googleInit() {
    let that = this;
    gapi.load('auth2', function () {
      that.auth2 = gapi.auth2.init({
        client_id: that.clientId,
        cookiepolicy: 'single_host_origin',
        scope: that.scope
      });
      that.attachSignin(that.element.nativeElement.firstChild);
    });
  }
  public attachSignin(element) {
    let that = this;
    this.auth2.attachClickHandler(element, {},
      function (googleUser) {

        let profile = googleUser.getBasicProfile();

        var token: string = googleUser.getAuthResponse().id_token;
        var id: number = profile.getId();
        var name: string = profile.getName();
        var photoUrl: string = profile.getImageUrl();
        var email: string = profile.getEmail();

        //console.log('Token || ' + token);
        //console.log('ID: ' + id);
        //console.log('Name: ' + name);
        //console.log('Image URL: ' + photoUrl);
        //console.log('Email: ' + email);
        //YOUR CODE HERE

        that._authService.googleLogin(email, name, id, photoUrl, token)
          .subscribe(
            data => {
              that.router.navigate([that.returnUrl]);
            },
            error => {
              that.alertService.error('There was an error: ' + error);
            }
          );

      }, function (error) {
        console.log(JSON.stringify(error, undefined, 2));
      });
  }

  constructor(private element: ElementRef, private _authService: AuthenticationService,
    private route: ActivatedRoute,
    private router: Router, private alertService: AlertService) {
    //console.log('ElementRef: ', this.element);
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  ngAfterViewInit() {
    this.googleInit();
  }

}
