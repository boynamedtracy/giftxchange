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
  private twitterRequestToken: string = "";
  private twitterTokenSecret: string = "";

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
          localStorage.setItem('auth_token', user.token.auth_token);
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
          console.log(JSON.parse(user.token));
          localStorage.setItem('currentUser', JSON.stringify(user));
          localStorage.setItem('auth_token', JSON.parse(user.token).auth_token);
          this.loggedIn = true;
          this._authSource.next(user);
          return true;
        }
      })
      .catch(this.handleError);
  }

  facebookLogin(accessToken: string) {
    console.log('login: ' + accessToken);
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let body = JSON.stringify({ accessToken });
    return this.http
      .post(this.config.apiUrl + '/account/fblogin', body, { headers })
      .map((response: Response) => {
        // login successful if there's a jwt token in the response
        let user = response.json();
        if (user && user.token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(user));
          localStorage.setItem('auth_token', user.token.auth_token);
          this.loggedIn = true;
          this._authSource.next(user);
          return true;
        }
      })
      .catch(this.handleError);
  }

  twitterLogin(accessToken: string, authSecret: string) {
    console.log('login: ' + accessToken);
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let body = JSON.stringify({ accessToken, authSecret });
    return this.http
      .post(this.config.apiUrl + '/account/twitterlogin', body, { headers })
      .map((response: Response) => {
        //alert(response.json());
        // login successful if there's a jwt token in the response
        //let user = response.json();
        //if (user && user.token) {
        //  // store user details and jwt token in local storage to keep user logged in between page refreshes
        //  localStorage.setItem('currentUser', JSON.stringify(user));
        //  this.loggedIn = true;
        //  this._authSource.next(user);
        //  return true;
        //}
      })
      .catch(this.handleError);
  }

  twitterLoginSetup() {
    return this.http.get(this.config.apiUrl + "/account/gettwittertoken")
      .map((response: Response) => {
        //console.log('response from wtitter login: ' + response.json());
        this.twitterRequestToken = response.json().oauth_token;
        this.twitterTokenSecret = response.json().oauth_token_secret;
        return true;
      });
  }

  twitterAccessToken(authToken: string, authVerifier: string) {
    return this.http.get(this.config.apiUrl + "/account/gettwitteraccess?accessToken=" + authToken + '&authVerifier=' + authVerifier)
      .map((response: Response) => {
        
        //console.log('response from twitterAccessToken: ' + response.json());
        //this.twitterRequestToken = response.json().oauth_token;
        //this.twitterTokenSecret = response.json().oauth_token_secret;
        let user = response.json();
        //alert('user: ' + user);
        if (user && user.token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(user));
          localStorage.setItem('auth_token', user.token.auth_token);
          this.loggedIn = true;
          this._authSource.next(user);
          return true;
        }
        return true;
      });
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    localStorage.removeItem('auth_token');
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

  getTwitterRequestToken(): string {
    return this.twitterRequestToken;
  }
  getTwitterTokenSecret(): string {
    return this.twitterTokenSecret;
  }
}
