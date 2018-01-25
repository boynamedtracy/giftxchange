import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from '../../_services/alert.service';
import { AuthenticationService } from '../../_services/authentication.service';
import { UserService } from '../../_services/user.service';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss']
})
export class MyProfileComponent implements OnInit {

  returnUrl: string = '';

  user: any = {};

  gender: string = '';

  loading: boolean = false;

  isSocialUser: boolean = false;
  enableEmailUpdate: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private alertService: AlertService,
    private authService: AuthenticationService,
    private userService: UserService
  ) {

    this.user = authService.getUser();
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/home';

  }

  ngOnInit() {
    if (this.user != null) {
      this.isSocialUser = (this.user.facebookid || this.user.twitterId || this.user.googleId);
      this.gender = this.user.gender;
    }
  }

  dateChanged(newDate) {
    this.user.birthDate = new Date(newDate);
  }

  updateProfile() {
    this.user.gender = this.gender;
    this.userService.updateProfile(this.user)
      .subscribe(
      data => {
        var s = "";
        if (!data.emailChanged) {
          s = "Profile Updated!";
        } else {
          s = "Your email has been updated. Please check your inbox to confirm your new email address."
        }
        this.alertService.success(s, true);
        this.router.navigate([this.returnUrl]);
      },
      error => {
        this.alertService.error('error: ' + error, false);
      }
      )
  }

}
