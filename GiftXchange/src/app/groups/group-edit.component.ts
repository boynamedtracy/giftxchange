import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, RouterState, ParamMap } from '@angular/router';
import { AuthenticationService } from '../_services/authentication.service';
import { AlertService } from '../_services/alert.service';
import { GroupsService } from '../_services/groups.service';
import { User } from '../_models/user.model';
import { Group } from '../_models/group.model';

@Component({
  selector: 'group-edit',
  templateUrl: './group-edit.component.html'
})

export class GroupEditComponent implements OnInit {

  currentUser: User;
  group: any = {
    dateCreated: new Date()
  };
  groups: Group[] = [];

  id: number = -1;

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

      this.route.queryParams.subscribe(params => {
        this.id = params['id'];
        if (this.id > 0) {
          this.groupsService.getGroup(this.id.toString())
            .subscribe(
            data => {
              this.group = data;
            },
            error => {
              this.alertService.error('error: ' + error, false);
            }
            )
        }
      });

      this.groupsService.getGroups()
        .subscribe(
        data => {
          this.groups = data;
          this.alertService.success('groups loaded: ' + data.length);
        },
        error => {
          this.alertService.error('Error: ' + error, false);
        }
        );
    }

  }
  saveGroup() {
    this.loading = true;
    this.groupsService.saveGroup(this.group)
      .subscribe(
      data => {
        this.alertService.success("Your account has been created. You may now log in.", true);
        this.router.navigate(['/home']);
      },
      error => {
        this.loading = false;
        this.alertService.error("There was an error: " + error, false);
      }
      );
  }
}
