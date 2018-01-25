import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, RouterState } from '@angular/router';

import { User } from '../_models/user.model';
import { AuthenticationService } from '../_services/index';
import { GroupsService } from '../_services/groups.service';
import { Group } from '../_models/group.model';
import { AlertService } from '../_services/alert.service';
import { GroupMember } from '../_models/group-member.model';

@Component({
  selector: 'group-details',
  templateUrl: 'group-details.component.html'
})

export class GroupDetailsComponent implements OnInit {

  currentUser: User;
  id: number = -1;
  group: Group;
  members: GroupMember[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private alertService: AlertService,
    private authService: AuthenticationService,
    private groupsService: GroupsService
  ) {
    this.currentUser = authService.getUser();

    if (this.currentUser == null) {
      this.router.navigate(['/']);
    }

  }

  ngOnInit() {
    this.id = parseInt(this.route.snapshot.paramMap.get('id'));
    console.log(this.route.snapshot.paramMap);
    console.log(this.id);
    //this.route.queryParams.subscribe(params => {
    //  this.id = params['id'];
      if (this.id > 0) {
        this.groupsService.getGroup(this.id.toString())
          .subscribe(
          data => {
            this.group = data;
            if (this.group != null) {
              this.groupsService.getMembers(this.group.id)
                .subscribe(
                data => {
                  this.members = data;
                },
                error => {
                  
                }
                );
            }
          },
          error => {
            this.alertService.error('error: ' + error, false);
          }
          )
      }
    //});
  }

}
