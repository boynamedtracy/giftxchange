import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';



import { BaseService } from './base.service'

import { AppConfig } from '../app.config';
import { User } from '../_models/user.model';

@Injectable()
export class UserService extends BaseService {

  getAuthHeaders(): RequestOptions {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let authToken = localStorage.getItem('auth_token');
    headers.append('Authorization', `Bearer ${authToken}`);
    let options = new RequestOptions({ headers: headers, withCredentials: true });
    return options;
  }

  constructor(private http: Http, private config: AppConfig) {
    super();
  }

  register(email: string, password: string, confirmPassword: string, firstName: string,
    lastName: string, gender: string) {

    let body = JSON.stringify({ email, password, confirmPassword, firstName, lastName, gender });
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post(this.config.apiUrl + '/account/register', body, options)
      .map(res => true)
      .catch(this.handleError);
  }

  confirmEmail(userId: string, code: string) {
    let body = JSON.stringify({ userId, code });
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post(this.config.apiUrl + '/account/confirmemail', body, options)
      .map(res => res)
      .catch(this.handleError);

  }

  updateProfile(user: any) {
    let options = this.getAuthHeaders();

    return this.http.post(this.config.apiUrl + '/account/updateprofile', user, options)
      .map((response: Response) => {
        let vm = response.json();

        console.log('vm: ' + vm);
        console.log('vm.user: ' + JSON.stringify(vm.user));
        console.log('vm.emailChanged: ' + vm.emailChanged);

        localStorage.setItem('currentUser', JSON.stringify(vm.user));

        if (vm.emailChanged == false) {
          
        } else {
          
        }
        
        
        return vm;
      });

  }

  saveprofilePic(data: string) {
    let options = this.getAuthHeaders();
    //console.log('saving ' + data);
    return this.http.post(this.config.apiUrl + '/account/saveprofilepic', { imgdata: data }, options)
      .map((response: Response) => {
        console.log('saveprofilePic response: ' + response);
      });

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
