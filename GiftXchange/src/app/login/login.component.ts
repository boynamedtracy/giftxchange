import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AlertService, AuthenticationService } from '../_services/index';
import { LoginViewModel } from '../_models/login.viewmodel';
import { GoogleSigninComponent } from '../google-signin/google-signin.component';
import { FacebookSigninComponent } from '../facebook-signin/facebook-signin.component';
import { TwitterLoginResponseComponent } from '../twitter-login-response/twitter-login-response.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  model: any = {};
  loading = false;
  returnUrl: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private alertService: AlertService) {

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/home';

    console.log('constructor: ' + this.authenticationService.isLoggedIn());

    if (this.authenticationService.isLoggedIn) {
      this.router.navigate([this.returnUrl]);
    }

  }

  ngOnInit() {
    // reset login status
    //this.authenticationService.logout();    



  }

  login() {
    this.loading = true;
    this.authenticationService.login(this.model.username, this.model.password)
      .subscribe(
        data => {
          this.router.navigate([this.returnUrl]);
        },
        error => {
          this.alertService.error('There was an error: ' + error);
          this.loading = false;
        }
      )
  }

}
