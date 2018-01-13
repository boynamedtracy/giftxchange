import { Component, OnInit } from '@angular/core';

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

  constructor(private authService: AuthenticationService) {
    //this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.currentUser = authService.getUser();
  }

  ngOnInit() {

  }

  logout() {
    this.authService.logout();
    this.currentUser = null;
  }

}
