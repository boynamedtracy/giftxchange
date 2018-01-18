import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import 'rxjs/add/operator/switchMap';
import { UserService } from '../_services/user.service';
import { AlertService } from '../_services/alert.service';

@Component({
  selector: 'app-confirm-email',
  templateUrl: './confirm-email.component.html',
  styleUrls: ['./confirm-email.component.scss']
})
export class ConfirmEmailComponent implements OnInit {

  userId: string = "";
  code: string = "";

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private alertService: AlertService ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.userId = params['userId'];
      this.code = params['code'];
    });

    //console.log('userId: ' + this.userId);
    //console.log('code: ' + this.code);

    if (this.userId && this.code) {
      this.userService.confirmEmail(this.userId, this.code).
        subscribe(
        data => {
            this.alertService.success('Your email has been confirmed. You may now log in.', true);
            this.router.navigate(['/login']);
          },
          error => {
            this.alertService.error('There was an error: ' + error, false);
          }
        )
    }

  }

}
