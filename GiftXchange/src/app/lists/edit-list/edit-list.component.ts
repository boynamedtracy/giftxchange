import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, RouterState, ParamMap } from '@angular/router';
import { AuthenticationService } from '../../_services/authentication.service';
import { AlertService } from '../../_services/alert.service';
import { ListsService } from '../../_services/lists.service';
import { User } from '../../_models/user.model';
import { List } from '../../_models/list.model';

@Component({
  selector: 'app-edit-list',
  templateUrl: './edit-list.component.html',
  styleUrls: ['./edit-list.component.scss']
})
export class EditListComponent implements OnInit {

  currentUser: User;
  list: any = {};
  id: number = -1;

  loading: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private alertService: AlertService,
    private authService: AuthenticationService,
    private listsService: ListsService
  ) {
    this.currentUser = authService.getUser();

    if (this.currentUser == null) {
      this.router.navigate(['/']);
    }

  }

  ngOnInit() {
    this.id = parseInt(this.route.snapshot.paramMap.get('id'));
    if (this.id > 0) {
      this.listsService.getList(this.id.toString()).subscribe(
        data => {
          this.list = data;
          if (this.list == null) {
            this.router.navigate(['/home']);
          }
        },
        error => {
          this.alertService.error('Error: ' + error, false);
        }
      )
    }
  }

  savelist() {
    this.loading = true;
    this.list.owner = this.currentUser;
    this.listsService.saveList(this.list).subscribe(
      data => {
        this.alertService.success('list updated', true);
        this.router.navigate(['/home']);
      },
      error => {
        this.alertService.error('error: ' + error, false);
      }

    )
  }

}
