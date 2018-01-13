import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { RegisterViewModel } from '../_models/register.viewmodel';
import { AlertService } from '../_services/alert.service';
import { AuthenticationService } from '../_services/authentication.service';
import { UserService } from '../_services/user.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  model: any = {};
  loading = false;
  returnUrl: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private alertService: AlertService) {
  }

  ngOnInit() {

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

    if (this.authenticationService.isLoggedIn())
      this.router.navigate([this.returnUrl]);
  }

  register() {
    this.loading = true;
    this.userService.register(this.model.email, this.model.password,
      this.model.confirmPassword, this.model.firstName, this.model.lastName, this.model.gender)
      .subscribe(
        data => {
          //this.router.navigate([this.returnUrl]);
          this.alertService.success("Your account has been created. You may now log in.", true);
          this.router.navigate(['/login']);
        },
        error => {
          this.loading = false;
          this.alertService.error("There was an error: " + error, false);
        });
  }

}
