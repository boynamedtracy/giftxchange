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
import { Group } from '../_models/group.model';
import { GroupInviteViewModel } from '../_models/group-invite.viewmodel';
import { GroupInviteAcceptViewModel } from '../_models/group-invite-accept.viewmodel';

@Injectable()
export class GroupsService extends BaseService {

  private _authSource = new BehaviorSubject<User>(null);

  getAuthHeaders(): RequestOptions {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let authToken = localStorage.getItem('auth_token');
    headers.append('Authorization', `Bearer ${authToken}`);
    let options = new RequestOptions({ headers: headers, withCredentials: true });
    return options;
  }

  constructor(private http: Http, private config: AppConfig,
    private _userService: UserService) {
    super();
  }

  saveGroup(group: Group) {

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let authToken = localStorage.getItem('auth_token');
    headers.append('Authorization', `Bearer ${authToken}`);
    let options = this.getAuthHeaders();

    var vm: any = {
      id: group.id,
      name: group.name,
      slug: group.slug,
      description: group.description,
      dateCreated: group.dateCreated,
      guid: group.guid
    };

    return this.http.post(this.config.apiUrl + '/groups/savegroup', group, options)
      .map((response: Response) => {
        // login successful if there's a jwt token in the response
        let group = response.json();
        console.log('saveGroup: ' + group.id);
        return group;
      })
      .catch(this.handleError);
  }

  getGroup(id: string) {

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    let authToken = localStorage.getItem('auth_token');
    headers.append('Authorization', `Bearer ${authToken}`);

    let options = new RequestOptions({ headers: headers, withCredentials: true });

    return this.http.get(this.config.apiUrl + `/groups/getgroup/${id}`, options)
      .map((response: Response) => {
        let group = response.json();
        console.log('getGroups: ' + group.name);
        return group;
      });
  }

  getGroups() {

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let authToken = localStorage.getItem('auth_token');
    headers.append('Authorization', `Bearer ${authToken}`);
    let options = new RequestOptions({ headers: headers, withCredentials: true });

    return this.http.get(this.config.apiUrl + "/groups/index", options)
      .map((response: Response) => {
        let groups = response.json();
        console.log('getGroups: ' + groups.length);
        return groups;
      });
  }

  getMembers(id: number) {

    let options = this.getAuthHeaders();

    return this.http.get(this.config.apiUrl + `/groups/getmembers/${id}`, options)
      .map((response: Response) => {
        let members = response.json();
        
        return members;
      });
  }

  inviteMember(vm: GroupInviteViewModel) {
    let options = this.getAuthHeaders();

    return this.http.post(this.config.apiUrl + '/groups/invitemember', vm, options)
      .map((response: Response) => {        
        let msg = response;
        return msg;
      });

  }

  getInvite(guid: string) {
    let options = this.getAuthHeaders();

    return this.http.get(this.config.apiUrl + `/groups/getinvite/${guid}`, options)
      .map((response: Response) => {
        let invite = response.json();
        return invite;
      });
  }

  acceptInvite(vm: GroupInviteAcceptViewModel) {
    let options = this.getAuthHeaders();

    return this.http.post(this.config.apiUrl + '/groups/acceptinvite', vm, options)
      .map((response: Response) => {
        let msg = response;
        return msg;
      });

  }

  getExchanges(groupId: number) {
    let options = this.getAuthHeaders();

    return this.http.get(this.config.apiUrl + `/groups/getexchanges/${groupId}`, options)
      .map((response: Response) => {
        let exchanges = response.json();
        return exchanges;
      });
  }

  getExchange(id: number) {
    let options = this.getAuthHeaders();

    return this.http.get(this.config.apiUrl + `/groups/getexchange/${id}`, options)
      .map((response: Response) => {
        let exchange = response.json();
        return exchange;
      });
  }

  saveExchange(exchange: any) {
    let options = this.getAuthHeaders();

    return this.http.post(this.config.apiUrl + '/groups/saveexchange', exchange, options)
      .map((response: Response) => {
        let exchange = response.json();
        return exchange;
      });

  }


}
