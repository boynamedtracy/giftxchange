import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, RouterState, ParamMap } from '@angular/router';
import { AuthenticationService } from '../../_services/authentication.service';
import { AlertService } from '../../_services/alert.service';
import { User } from '../../_models/user.model';

import { Group } from '../../_models/group.model';
import { GroupsService } from '../../_services/groups.service';
import { GroupInviteViewModel } from '../../_models/group-invite.viewmodel';

@Component({
  selector: 'app-send-invite',
  templateUrl: './send-invite.component.html'
})
export class SendInviteComponent implements OnInit {

  currentUser: User;

  id: number;
  group: Group;
  invite: any = { };

  loading = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private alertService: AlertService,
    private authService: AuthenticationService,
    private groupsService: GroupsService
  ) {

    this.currentUser = authService.getUser();

  }

  ngOnInit() {
    if (this.currentUser != null) {
      this.id = parseInt(this.route.snapshot.paramMap.get('id'));

      if (this.id > 0) {
        this.groupsService.getGroup(this.id.toString())
          .subscribe(
          data => {
            this.group = data;
            this.invite.groupId = this.group.id;
            this.invite.invitedBy = this.currentUser.id;
          },
          error => {
            this.alertService.error('error: ' + error, false);
          }
          )
      }

    }
  }

  sendInvite() {
    console.log('send invite');
    this.loading = true;

    var x = <GroupInviteViewModel>this.invite;

    console.log('this.invite.groupId: ' + this.invite.groupId);

    this.groupsService.inviteMember(x)
      .subscribe(
      data => {
        this.alertService.success('Invite sent!', true);
        this.router.navigate(['/group/' + this.id]);
      },
      error => {
        this.alertService.error('Error: ' + error, false);
      }
      );

  }

}
