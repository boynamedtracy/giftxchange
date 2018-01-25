import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, RouterState, ParamMap } from '@angular/router';
import { AuthenticationService } from '../../_services/authentication.service';
import { AlertService } from '../../_services/alert.service';
import { User } from '../../_models/user.model';

import { Group } from '../../_models/group.model';
import { GroupsService } from '../../_services/groups.service';
import { GroupInvite } from '../../_models/group-invite.model';
import { GroupInviteAcceptViewModel } from '../../_models/group-invite-accept.viewmodel';

@Component({
  selector: 'app-accept-invite',
  templateUrl: './accept-invite.component.html',
  styleUrls: ['./accept-invite.component.scss']
})
export class AcceptInviteComponent implements OnInit {

  currentUser: User;

  guid: string;
  id: number;
  group: Group;
  invite: GroupInvite;

  loading = false;

  returnUrl: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private alertService: AlertService,
    private authService: AuthenticationService,
    private groupsService: GroupsService
  ) {

    this.currentUser = authService.getUser();
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/home';

  }

  ngOnInit() {

    if (this.currentUser != null) {

      this.guid = this.route.snapshot.paramMap.get('guid');

      this.groupsService.getInvite(this.guid)
        .subscribe(
        data => {
          this.invite = data;
          if (this.invite != null) {
            var vm: GroupInviteAcceptViewModel = {
              guid: this.invite.guid,
            }
            this.groupsService.acceptInvite(vm)
              .subscribe(
              data => {
                if (data.statusText == "Success") {
                  this.alertService.success("You have successfully joined " + this.group.name, true);
                  this.router.navigate([`/group/${this.group.id}`]);
                }
              },
              error => {
                this.alertService.error("There was an error: " + error);
              }
              );
          }
        },
        error => {
          this.alertService.error("There was an error: " + error);
        }
        );

    }

  }

}
