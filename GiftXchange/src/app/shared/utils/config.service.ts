import { Injectable } from '@angular/core';
 
@Injectable()
export class ConfigService {
     
    _apiURI : string;
 
    constructor() {
      if (document.location.href.indexOf('localhost') > -1) {
        //this._apiURI = 'http://localhost:62139';
      } else {
        //this._apiURI = 'https://giftxchange.azurewebsites.net';
      }
      this._apiURI = '/api'
     }
 
     getApiURI() {
         return this._apiURI;
     }    
}
