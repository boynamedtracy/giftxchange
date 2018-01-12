import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { BaseService } from './base.service'

import { Register } from '../_models/index';

import { AppConfig } from '../app.config';

@Injectable()
export class UserService extends BaseService {

  constructor(private http: Http, private config: AppConfig) {
    super();
  }

  register(email: string, password: string, confirmPassword: string, firstName: string,
    lastName: string, gender: string) {

    let body = JSON.stringify({ email, password, confirmPassword, firstName, lastName, gender });
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post(this.config.apiUrl + '/register', body, options)
      .map(res => true)
      .catch(this.handleError);
  }

  // private helper methods
  private jwt() {
    // create authorization header with jwt token
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser && currentUser.token) {
      let headers = new Headers({ 'Authorization': 'Bearer ' + currentUser.token });
      return new RequestOptions({ headers: headers });
    }
  }

}
