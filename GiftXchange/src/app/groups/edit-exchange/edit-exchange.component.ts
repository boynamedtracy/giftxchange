import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, RouterState, ParamMap } from '@angular/router';
import { AuthenticationService } from '../../_services/authentication.service';
import { AlertService } from '../../_services/alert.service';
import { GroupsService } from '../../_services/groups.service';
import { User } from '../../_models/user.model';
import { Exchange } from '../../_models/exchange.model';

@Component({
  selector: 'app-edit-exchange',
  templateUrl: './edit-exchange.component.html',
  styleUrls: ['./edit-exchange.component.scss']
})
export class EditExchangeComponent implements OnInit {


  currentUser: User;
  exchange: any = {
    dateCreated: new Date()
  };

  id: number = -1;
  groupId: number = -1;

  loading = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private alertService: AlertService,
    private authService: AuthenticationService,
    private groupService: GroupsService
  ) {

    this.currentUser = authService.getUser();

  }

  ngOnInit() {
    if (this.currentUser != null) {

      this.id = parseInt(this.route.snapshot.paramMap.get('id'));
      this.groupId = parseInt(this.route.snapshot.paramMap.get('groupId'));

      if (!this.groupId || this.groupId < 1) {
        this.alertService.error('Group not found!', true);
        this.router.navigate(['/home']);
      }

      this.exchange.groupId = this.groupId;

      if (this.id > 0) {
        this.groupService.getExchange(this.id)
          .subscribe(
          data => {
            this.exchange = data;
          },
          error => {
            this.alertService.error('error: ' + error, false);
          }
          )
      }

    }

  }
  saveExchange() {
    this.loading = true;
    this.groupService.saveExchange(this.exchange)
      .subscribe(
      data => {
        this.alertService.success("Exchange added.", true);
        this.router.navigate(['/group/' + this.groupId]);
      },
      error => {
        this.loading = false;
        this.alertService.error("There was an error: " + error, false);
      }
      );
  }

}
