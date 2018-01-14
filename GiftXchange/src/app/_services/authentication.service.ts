import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

import { BehaviorSubject } from 'rxjs/Rx';
// Statics
import 'rxjs/add/observable/throw';

// Operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/toPromise';

import { AppConfig } from '../app.config';

import { UserService } from './user.service';
import { User } from '../_models/user.model';
import { BaseService } from './base.service';

@Injectable()
export class AuthenticationService extends BaseService {

  private _authSource = new BehaviorSubject<User>(null);

  private loggedIn = false;

  constructor(private http: Http, private config: AppConfig,
    private _userService: UserService) {
    super();
    if (localStorage.getItem('currentUser') != null) {
      var u: User = JSON.parse(localStorage.getItem('currentUser')) as User;
      this.loggedIn = !!u;
      this._authSource.next(u);
    } else {
      this.loggedIn = false;
    }
  }

  login(username: string, password: string) {
    return this.http.post(this.config.apiUrl + '/account/authenticate', { username: username, password: password })
      .map((response: Response) => {
        // login successful if there's a jwt token in the response
        let user = response.json();
        if (user && user.token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.loggedIn = true;
          this._authSource.next(user);
          return true;
        }
      })
      .catch(this.handleError);
  }

  googleLogin(email: string, name: string, id: number, photoUrl: string, token: string) {
    return this.http.post(this.config.apiUrl + '/account/googlelogin', {
      email: email, name: name,
      googleId: id, photoUrl: photoUrl, token: token
    })
      .map((response: Response) => {
        // login successful if there's a jwt token in the response
        let user = response.json();
        if (user && user.token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.loggedIn = true;
          this._authSource.next(user);
          return true;
        }
      })
      .catch(this.handleError);
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.loggedIn = false;
    this._authSource.next(null);
  }

  isLoggedIn(): boolean {
    return this.loggedIn;
  }

  getUser(): User {
    if (!this.loggedIn)
      return null;
    var u: User = JSON.parse(localStorage.getItem('currentUser')) as User;
    return u;
  }
}
