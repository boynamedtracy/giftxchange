import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, RouterState } from '@angular/router';
import { AuthenticationService } from '../../_services/authentication.service';
import { User } from '../../_models/user.model';


@Component({
  selector: 'gx-header',
  templateUrl: './header.component.html'
})

export class HeaderComponent implements OnInit {

  isLoggedIn: boolean = false;
  user: User;
  thisUrl: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthenticationService
  ) {

    this.isLoggedIn = authService.isLoggedIn();
    this.thisUrl = this.router.url;

    if (this.isLoggedIn) {
      this.user = authService.getUser();
    }

  }

  ngOnInit() {
    console.log('thisurl: ' + this.thisUrl);
  }

  logout() {
    this.authService.logout();
    this.user = null;
    this.router.navigate(['/']);
  }

}
