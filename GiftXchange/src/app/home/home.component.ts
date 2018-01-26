import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, RouterState } from '@angular/router';

import { User } from '../_models/user.model';
import { AuthenticationService } from '../_services/index';
import { GroupsService } from '../_services/groups.service';
import { Group } from '../_models/group.model';
import { AlertService } from '../_services/alert.service';
import { ListsService } from '../_services/lists.service';
import { List } from '../_models/list.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {



  currentUser: User;
  users: User[] = [];

  groups: Group[] = [];
  lists: List[] = [];

  constructor(private route: ActivatedRoute,
    private router: Router,
    private alertService: AlertService,
    private authService: AuthenticationService,
    private groupsService: GroupsService,
    private listsService: ListsService
  ) {
    //this.currentUser = JSON.parse(localStorage.getItem('currentUser'));

    //authGuard.canActivate(this.route.snapshot, this.state.snapshot)
    this.currentUser = authService.getUser();

  }

  ngOnInit() {
    //if (!this.authService.isLoggedIn()) {
    //  this.router.navigate(['/']);
    //}

    if (this.currentUser != null) {
      this.groupsService.getGroups()
        .subscribe(
          data => {
            this.groups = data;
          },
          error => {
            this.alertService.error('Error loading groups: ' + error, false);
          }
        );
      this.listsService.getLists()
        .subscribe(
        data => {
          this.lists = data;
        },
        error => {
          this.alertService.error('Error loading lists: ' + error, false);
        }
        );
    }

  }



  logout() {
    this.authService.logout();
    this.currentUser = null;
    this.router.navigate(['/']);
  }

}
