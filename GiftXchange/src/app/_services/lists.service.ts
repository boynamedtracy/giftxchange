import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
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
import { List } from '../_models/list.model';
import { ListItem } from '../_models/list-item.model';

@Injectable()
export class ListsService extends BaseService {

  private _authSource = new BehaviorSubject<User>(null);

  constructor(private http: Http, private config: AppConfig,
    private _userService: UserService) {
    super();
  }

  saveList(list: List) {

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let authToken = localStorage.getItem('auth_token');
    headers.append('Authorization', `Bearer ${authToken}`);
    let options = new RequestOptions({ headers: headers, withCredentials: true });

    var vm: any = {
      id: list.id,
      name: list.name,
      slug: list.slug,
      description: list.description,
      dateCreated: list.dateCreated,
      guid: list.guid
    };

    return this.http.post(this.config.apiUrl + '/lists/savelist', list, options)
      .map((response: Response) => {
        // login successful if there's a jwt token in the response
        let group = response.json();
        console.log('saveGroup: ' + group.id);
        return group;
      })
      .catch(this.handleError);
  }

  addItem(item: ListItem) {

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let authToken = localStorage.getItem('auth_token');
    headers.append('Authorization', `Bearer ${authToken}`);
    let options = new RequestOptions({ headers: headers, withCredentials: true });

    return this.http.post(this.config.apiUrl + '/lists/additem', item, options)
      .map((response: Response) => {
        // login successful if there's a jwt token in the response
        let item = response.json();
        console.log('add-item: ' + item.id);
        return item;
      })
      .catch(this.handleError);
  }

  getList(id: string) {

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    let authToken = localStorage.getItem('auth_token');
    headers.append('Authorization', `Bearer ${authToken}`);

    let options = new RequestOptions({ headers: headers, withCredentials: true });

    return this.http.get(this.config.apiUrl + `/lists/getlist/${id}`, options)
      .map((response: Response) => {
        let list = response.json();
        console.log('getGroups: ' + list.name);
        return list;
      });
  }

  getLists() {

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let authToken = localStorage.getItem('auth_token');
    headers.append('Authorization', `Bearer ${authToken}`);
    let options = new RequestOptions({ headers: headers, withCredentials: true });

    return this.http.get(this.config.apiUrl + "/lists/getlists", options)
      .map((response: Response) => {
        let lists = response.json();
        console.log('getLists: ' + lists.length);
        return lists;
      });
  }

  
}
