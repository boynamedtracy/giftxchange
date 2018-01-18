import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, RouterState } from '@angular/router';

import { User } from '../_models/user.model';
import { AuthenticationService } from '../_services/index';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  currentUser: User;
  users: User[] = [];

  constructor(private route: ActivatedRoute,
    private router: Router,
    private authService: AuthenticationService) {
    //this.currentUser = JSON.parse(localStorage.getItem('currentUser'));

    //authGuard.canActivate(this.route.snapshot, this.state.snapshot)
    this.currentUser = authService.getUser();
  }

  ngOnInit() {
    //if (!this.authService.isLoggedIn()) {
    //  this.router.navigate(['/']);
    //}
  }

  logout() {
    this.authService.logout();
    this.currentUser = null;
    this.router.navigate(['/']);
  }

}
