import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, RouterState, ParamMap } from '@angular/router';
import { AuthenticationService } from '../../_services/authentication.service';
import { AlertService } from '../../_services/alert.service';
import { ListsService } from '../../_services/lists.service';
import { User } from '../../_models/user.model';
import { List } from '../../_models/list.model';

@Component({
  selector: 'app-add-item-component',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.scss']
})
export class AddItemComponent implements OnInit {

  currentUser: User;
  listId: number = -1;
  list: List;

  loading: boolean = false;

  item: any = {};

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
    this.listId = parseInt(this.route.snapshot.paramMap.get('id'));

    if (this.listId < 1)
      this.router.navigate(['/home']);

    this.listsService.getList(this.listId.toString())
      .subscribe(
      data => {
        this.list = data;
        this.item.listId = this.listId;
      },
      error => {
        this.alertService.error('error: ' + error, false);
      }
      )

  }

  saveitem() {
    this.loading = true;
    this.listsService.addItem(this.item)
      .subscribe(
      data => {
        this.alertService.success("Item added!", true);
        this.router.navigate(['/home']);
      },
      error => {
        this.loading = false;
        this.alertService.error("There was an error: " + error, false);
      }
      );
  }

}
