webpackJsonp(["main"],{

/***/ "../../../../../src/$$_lazy_route_resource lazy recursive":
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "../../../../../src/$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "../../../../../src/app/_directives/alert.component.html":
/***/ (function(module, exports) {

module.exports = "<div *ngIf=\"message\" [ngClass]=\"{ 'alert': message, 'alert-success': message.type === 'success', 'alert-danger': message.type === 'error' }\">{{message.text}}</div>\r\n"

/***/ }),

/***/ "../../../../../src/app/_directives/alert.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/esm5/core.js");
var index_1 = __webpack_require__("../../../../../src/app/_services/index.ts");
var AlertComponent = (function () {
    function AlertComponent(alertService) {
        this.alertService = alertService;
    }
    AlertComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.alertService.getMessage().subscribe(function (message) { _this.message = message; });
    };
    AlertComponent = __decorate([
        core_1.Component({
            moduleId: module.i,
            selector: 'alert',
            template: __webpack_require__("../../../../../src/app/_directives/alert.component.html")
        }),
        __metadata("design:paramtypes", [index_1.AlertService])
    ], AlertComponent);
    return AlertComponent;
}());
exports.AlertComponent = AlertComponent;


/***/ }),

/***/ "../../../../../src/app/_guards/auth.guard.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/esm5/core.js");
var router_1 = __webpack_require__("../../../router/esm5/router.js");
var AuthGuard = (function () {
    function AuthGuard(router) {
        this.router = router;
    }
    AuthGuard.prototype.canActivate = function (route, state) {
        if (localStorage.getItem('currentUser')) {
            // logged in so return true
            return true;
        }
        // not logged in so redirect to login page with the return url
        this.router.navigate(['/'], { queryParams: { returnUrl: state.url } });
        return false;
    };
    AuthGuard = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [router_1.Router])
    ], AuthGuard);
    return AuthGuard;
}());
exports.AuthGuard = AuthGuard;


/***/ }),

/***/ "../../../../../src/app/_services/alert.service.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/esm5/core.js");
var router_1 = __webpack_require__("../../../router/esm5/router.js");
var Subject_1 = __webpack_require__("../../../../rxjs/_esm5/Subject.js");
var AlertService = (function () {
    function AlertService(router) {
        var _this = this;
        this.router = router;
        this.subject = new Subject_1.Subject();
        this.keepAfterNavigationChange = false;
        router.events.subscribe(function (event) {
            if (event instanceof router_1.NavigationStart) {
                if (_this.keepAfterNavigationChange) {
                    // only keep for a single location change
                    _this.keepAfterNavigationChange = false;
                }
                else {
                    // clear alert
                    _this.subject.next();
                }
            }
        });
    }
    AlertService.prototype.success = function (message, keepAfterNavigationChange) {
        if (keepAfterNavigationChange === void 0) { keepAfterNavigationChange = false; }
        this.keepAfterNavigationChange = keepAfterNavigationChange;
        this.subject.next({ type: 'success', text: message });
    };
    AlertService.prototype.error = function (message, keepAfterNavigationChange) {
        if (keepAfterNavigationChange === void 0) { keepAfterNavigationChange = false; }
        this.keepAfterNavigationChange = keepAfterNavigationChange;
        this.subject.next({ type: 'error', text: message });
    };
    AlertService.prototype.getMessage = function () {
        return this.subject.asObservable();
    };
    AlertService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [router_1.Router])
    ], AlertService);
    return AlertService;
}());
exports.AlertService = AlertService;


/***/ }),

/***/ "../../../../../src/app/_services/authentication.service.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/esm5/core.js");
var http_1 = __webpack_require__("../../../http/esm5/http.js");
__webpack_require__("../../../../rxjs/_esm5/add/operator/map.js");
var Rx_1 = __webpack_require__("../../../../rxjs/_esm5/Rx.js");
// Statics
__webpack_require__("../../../../rxjs/_esm5/add/observable/throw.js");
// Operators
__webpack_require__("../../../../rxjs/_esm5/add/operator/catch.js");
__webpack_require__("../../../../rxjs/_esm5/add/operator/debounceTime.js");
__webpack_require__("../../../../rxjs/_esm5/add/operator/distinctUntilChanged.js");
__webpack_require__("../../../../rxjs/_esm5/add/operator/map.js");
__webpack_require__("../../../../rxjs/_esm5/add/operator/switchMap.js");
__webpack_require__("../../../../rxjs/_esm5/add/operator/toPromise.js");
var app_config_1 = __webpack_require__("../../../../../src/app/app.config.ts");
var user_service_1 = __webpack_require__("../../../../../src/app/_services/user.service.ts");
var base_service_1 = __webpack_require__("../../../../../src/app/_services/base.service.ts");
var AuthenticationService = (function (_super) {
    __extends(AuthenticationService, _super);
    function AuthenticationService(http, config, _userService) {
        var _this = _super.call(this) || this;
        _this.http = http;
        _this.config = config;
        _this._userService = _userService;
        _this._authSource = new Rx_1.BehaviorSubject(null);
        _this.loggedIn = false;
        _this.twitterRequestToken = "";
        _this.twitterTokenSecret = "";
        if (localStorage.getItem('currentUser') != null) {
            //localStorage.removeItem('currentUser')
            //console.log(localStorage.removeItem('currentUser'));
            var u = JSON.parse(localStorage.getItem('currentUser'));
            _this.loggedIn = !!u;
            _this._authSource.next(u);
        }
        else {
            _this.loggedIn = false;
        }
        return _this;
    }
    AuthenticationService.prototype.login = function (username, password) {
        var _this = this;
        return this.http.post(this.config.apiUrl + '/account/authenticate', { username: username, password: password })
            .map(function (response) {
            // login successful if there's a jwt token in the response
            var user = response.json();
            if (user && user.token) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('currentUser', JSON.stringify(user));
                console.log('auth_token: ' + JSON.parse(user.token).auth_token);
                localStorage.setItem('auth_token', JSON.parse(user.token).auth_token);
                _this.loggedIn = true;
                _this._authSource.next(user);
                return true;
            }
        })
            .catch(this.handleError);
    };
    AuthenticationService.prototype.googleLogin = function (email, name, id, photoUrl, token) {
        var _this = this;
        return this.http.post(this.config.apiUrl + '/account/googlelogin', {
            email: email, name: name,
            googleId: id, photoUrl: photoUrl, token: token
        })
            .map(function (response) {
            // login successful if there's a jwt token in the response
            var user = response.json();
            if (user && user.token) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                console.log(JSON.parse(user.token));
                localStorage.setItem('currentUser', JSON.stringify(user));
                localStorage.setItem('auth_token', JSON.parse(user.token).auth_token);
                _this.loggedIn = true;
                _this._authSource.next(user);
                return true;
            }
        })
            .catch(this.handleError);
    };
    AuthenticationService.prototype.facebookLogin = function (accessToken) {
        var _this = this;
        console.log('login: ' + accessToken);
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        var body = JSON.stringify({ accessToken: accessToken });
        return this.http
            .post(this.config.apiUrl + '/account/fblogin', body, { headers: headers })
            .map(function (response) {
            // login successful if there's a jwt token in the response
            var user = response.json();
            if (user && user.token) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('currentUser', JSON.stringify(user));
                localStorage.setItem('auth_token', user.token.auth_token);
                _this.loggedIn = true;
                _this._authSource.next(user);
                return true;
            }
        })
            .catch(this.handleError);
    };
    AuthenticationService.prototype.twitterLogin = function (accessToken, authSecret) {
        console.log('login: ' + accessToken);
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        var body = JSON.stringify({ accessToken: accessToken, authSecret: authSecret });
        return this.http
            .post(this.config.apiUrl + '/account/twitterlogin', body, { headers: headers })
            .map(function (response) {
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
    };
    AuthenticationService.prototype.twitterLoginSetup = function () {
        var _this = this;
        return this.http.get(this.config.apiUrl + "/account/gettwittertoken")
            .map(function (response) {
            //console.log('response from wtitter login: ' + response.json());
            _this.twitterRequestToken = response.json().oauth_token;
            _this.twitterTokenSecret = response.json().oauth_token_secret;
            return true;
        });
    };
    AuthenticationService.prototype.twitterAccessToken = function (authToken, authVerifier) {
        var _this = this;
        return this.http.get(this.config.apiUrl + "/account/gettwitteraccess?accessToken=" + authToken + '&authVerifier=' + authVerifier)
            .map(function (response) {
            //console.log('response from twitterAccessToken: ' + response.json());
            //this.twitterRequestToken = response.json().oauth_token;
            //this.twitterTokenSecret = response.json().oauth_token_secret;
            var user = response.json();
            //alert('user: ' + user);
            if (user && user.token) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('currentUser', JSON.stringify(user));
                localStorage.setItem('auth_token', user.token.auth_token);
                _this.loggedIn = true;
                _this._authSource.next(user);
                return true;
            }
            return true;
        });
    };
    AuthenticationService.prototype.logout = function () {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        localStorage.removeItem('auth_token');
        this.loggedIn = false;
        this._authSource.next(null);
    };
    AuthenticationService.prototype.isLoggedIn = function () {
        return this.loggedIn;
    };
    AuthenticationService.prototype.getUser = function () {
        if (!this.loggedIn)
            return null;
        //console.log(localStorage.getItem('currentUser'));
        var u = JSON.parse(localStorage.getItem('currentUser'));
        return u;
    };
    AuthenticationService.prototype.getTwitterRequestToken = function () {
        return this.twitterRequestToken;
    };
    AuthenticationService.prototype.getTwitterTokenSecret = function () {
        return this.twitterTokenSecret;
    };
    AuthenticationService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.Http, app_config_1.AppConfig,
            user_service_1.UserService])
    ], AuthenticationService);
    return AuthenticationService;
}(base_service_1.BaseService));
exports.AuthenticationService = AuthenticationService;


/***/ }),

/***/ "../../../../../src/app/_services/base.service.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Rx_1 = __webpack_require__("../../../../rxjs/_esm5/Rx.js");
var BaseService = (function () {
    function BaseService() {
    }
    BaseService.prototype.handleError = function (error) {
        var applicationError = error.headers.get('Application-Error');
        // either applicationError in header or model error in body
        if (applicationError) {
            return Rx_1.Observable.throw(applicationError);
        }
        var modelStateErrors = '';
        var serverError = error.json();
        if (!serverError.type) {
            for (var key in serverError) {
                if (serverError[key])
                    modelStateErrors += serverError[key] + '\n';
            }
        }
        modelStateErrors = modelStateErrors = '' ? null : modelStateErrors;
        return Rx_1.Observable.throw(modelStateErrors || 'Server error');
    };
    return BaseService;
}());
exports.BaseService = BaseService;


/***/ }),

/***/ "../../../../../src/app/_services/groups.service.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/esm5/core.js");
var http_1 = __webpack_require__("../../../http/esm5/http.js");
__webpack_require__("../../../../rxjs/_esm5/add/operator/map.js");
var Rx_1 = __webpack_require__("../../../../rxjs/_esm5/Rx.js");
// Statics
__webpack_require__("../../../../rxjs/_esm5/add/observable/throw.js");
// Operators
__webpack_require__("../../../../rxjs/_esm5/add/operator/catch.js");
__webpack_require__("../../../../rxjs/_esm5/add/operator/debounceTime.js");
__webpack_require__("../../../../rxjs/_esm5/add/operator/distinctUntilChanged.js");
__webpack_require__("../../../../rxjs/_esm5/add/operator/map.js");
__webpack_require__("../../../../rxjs/_esm5/add/operator/switchMap.js");
__webpack_require__("../../../../rxjs/_esm5/add/operator/toPromise.js");
var app_config_1 = __webpack_require__("../../../../../src/app/app.config.ts");
var user_service_1 = __webpack_require__("../../../../../src/app/_services/user.service.ts");
var base_service_1 = __webpack_require__("../../../../../src/app/_services/base.service.ts");
var GroupsService = (function (_super) {
    __extends(GroupsService, _super);
    function GroupsService(http, config, _userService) {
        var _this = _super.call(this) || this;
        _this.http = http;
        _this.config = config;
        _this._userService = _userService;
        _this._authSource = new Rx_1.BehaviorSubject(null);
        return _this;
    }
    GroupsService.prototype.getAuthHeaders = function () {
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        var authToken = localStorage.getItem('auth_token');
        headers.append('Authorization', "Bearer " + authToken);
        var options = new http_1.RequestOptions({ headers: headers, withCredentials: true });
        return options;
    };
    GroupsService.prototype.saveGroup = function (group) {
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        var authToken = localStorage.getItem('auth_token');
        headers.append('Authorization', "Bearer " + authToken);
        var options = this.getAuthHeaders();
        var vm = {
            id: group.id,
            name: group.name,
            slug: group.slug,
            description: group.description,
            dateCreated: group.dateCreated,
            guid: group.guid
        };
        return this.http.post(this.config.apiUrl + '/groups/savegroup', group, options)
            .map(function (response) {
            // login successful if there's a jwt token in the response
            var group = response.json();
            console.log('saveGroup: ' + group.id);
            return group;
        })
            .catch(this.handleError);
    };
    GroupsService.prototype.getGroup = function (id) {
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        var authToken = localStorage.getItem('auth_token');
        headers.append('Authorization', "Bearer " + authToken);
        var options = new http_1.RequestOptions({ headers: headers, withCredentials: true });
        return this.http.get(this.config.apiUrl + ("/groups/getgroup/" + id), options)
            .map(function (response) {
            var group = response.json();
            console.log('getGroups: ' + group.name);
            return group;
        });
    };
    GroupsService.prototype.getGroups = function () {
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        var authToken = localStorage.getItem('auth_token');
        headers.append('Authorization', "Bearer " + authToken);
        var options = new http_1.RequestOptions({ headers: headers, withCredentials: true });
        return this.http.get(this.config.apiUrl + "/groups/index", options)
            .map(function (response) {
            var groups = response.json();
            console.log('getGroups: ' + groups.length);
            return groups;
        });
    };
    GroupsService.prototype.getMembers = function (id) {
        var options = this.getAuthHeaders();
        return this.http.get(this.config.apiUrl + ("/groups/getmembers/" + id), options)
            .map(function (response) {
            var members = response.json();
            return members;
        });
    };
    GroupsService.prototype.inviteMember = function (vm) {
        var options = this.getAuthHeaders();
        return this.http.post(this.config.apiUrl + '/groups/invitemember', vm, options)
            .map(function (response) {
            var msg = response;
            return msg;
        });
    };
    GroupsService.prototype.getInvite = function (guid) {
        var options = this.getAuthHeaders();
        return this.http.get(this.config.apiUrl + ("/groups/getinvite/" + guid), options)
            .map(function (response) {
            var invite = response.json();
            return invite;
        });
    };
    GroupsService.prototype.acceptInvite = function (vm) {
        var options = this.getAuthHeaders();
        return this.http.post(this.config.apiUrl + '/groups/acceptinvite', vm, options)
            .map(function (response) {
            var msg = response;
            return msg;
        });
    };
    GroupsService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.Http, app_config_1.AppConfig,
            user_service_1.UserService])
    ], GroupsService);
    return GroupsService;
}(base_service_1.BaseService));
exports.GroupsService = GroupsService;


/***/ }),

/***/ "../../../../../src/app/_services/index.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__("../../../../../src/app/_services/alert.service.ts"));
__export(__webpack_require__("../../../../../src/app/_services/authentication.service.ts"));
__export(__webpack_require__("../../../../../src/app/_services/user.service.ts"));


/***/ }),

/***/ "../../../../../src/app/_services/lists.service.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/esm5/core.js");
var http_1 = __webpack_require__("../../../http/esm5/http.js");
__webpack_require__("../../../../rxjs/_esm5/add/operator/map.js");
var Rx_1 = __webpack_require__("../../../../rxjs/_esm5/Rx.js");
// Statics
__webpack_require__("../../../../rxjs/_esm5/add/observable/throw.js");
// Operators
__webpack_require__("../../../../rxjs/_esm5/add/operator/catch.js");
__webpack_require__("../../../../rxjs/_esm5/add/operator/debounceTime.js");
__webpack_require__("../../../../rxjs/_esm5/add/operator/distinctUntilChanged.js");
__webpack_require__("../../../../rxjs/_esm5/add/operator/map.js");
__webpack_require__("../../../../rxjs/_esm5/add/operator/switchMap.js");
__webpack_require__("../../../../rxjs/_esm5/add/operator/toPromise.js");
var app_config_1 = __webpack_require__("../../../../../src/app/app.config.ts");
var user_service_1 = __webpack_require__("../../../../../src/app/_services/user.service.ts");
var base_service_1 = __webpack_require__("../../../../../src/app/_services/base.service.ts");
var ListsService = (function (_super) {
    __extends(ListsService, _super);
    function ListsService(http, config, _userService) {
        var _this = _super.call(this) || this;
        _this.http = http;
        _this.config = config;
        _this._userService = _userService;
        _this._authSource = new Rx_1.BehaviorSubject(null);
        return _this;
    }
    ListsService.prototype.saveList = function (list) {
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        var authToken = localStorage.getItem('auth_token');
        headers.append('Authorization', "Bearer " + authToken);
        var options = new http_1.RequestOptions({ headers: headers, withCredentials: true });
        var vm = {
            id: list.id,
            name: list.name,
            slug: list.slug,
            description: list.description,
            dateCreated: list.dateCreated,
            guid: list.guid
        };
        return this.http.post(this.config.apiUrl + '/lists/savelist', list, options)
            .map(function (response) {
            // login successful if there's a jwt token in the response
            var group = response.json();
            console.log('saveGroup: ' + group.id);
            return group;
        })
            .catch(this.handleError);
    };
    ListsService.prototype.addItem = function (item) {
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        var authToken = localStorage.getItem('auth_token');
        headers.append('Authorization', "Bearer " + authToken);
        var options = new http_1.RequestOptions({ headers: headers, withCredentials: true });
        return this.http.post(this.config.apiUrl + '/lists/additem', item, options)
            .map(function (response) {
            // login successful if there's a jwt token in the response
            var item = response.json();
            console.log('add-item: ' + item.id);
            return item;
        })
            .catch(this.handleError);
    };
    ListsService.prototype.getList = function (id) {
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        var authToken = localStorage.getItem('auth_token');
        headers.append('Authorization', "Bearer " + authToken);
        var options = new http_1.RequestOptions({ headers: headers, withCredentials: true });
        return this.http.get(this.config.apiUrl + ("/lists/getlist/" + id), options)
            .map(function (response) {
            var list = response.json();
            console.log('getGroups: ' + list.name);
            return list;
        });
    };
    ListsService.prototype.getLists = function () {
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        var authToken = localStorage.getItem('auth_token');
        headers.append('Authorization', "Bearer " + authToken);
        var options = new http_1.RequestOptions({ headers: headers, withCredentials: true });
        return this.http.get(this.config.apiUrl + "/lists/getlists", options)
            .map(function (response) {
            var lists = response.json();
            console.log('getLists: ' + lists.length);
            return lists;
        });
    };
    ListsService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.Http, app_config_1.AppConfig,
            user_service_1.UserService])
    ], ListsService);
    return ListsService;
}(base_service_1.BaseService));
exports.ListsService = ListsService;


/***/ }),

/***/ "../../../../../src/app/_services/user.service.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/esm5/core.js");
var http_1 = __webpack_require__("../../../http/esm5/http.js");
var base_service_1 = __webpack_require__("../../../../../src/app/_services/base.service.ts");
var app_config_1 = __webpack_require__("../../../../../src/app/app.config.ts");
var UserService = (function (_super) {
    __extends(UserService, _super);
    function UserService(http, config) {
        var _this = _super.call(this) || this;
        _this.http = http;
        _this.config = config;
        return _this;
    }
    UserService.prototype.getAuthHeaders = function () {
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        var authToken = localStorage.getItem('auth_token');
        headers.append('Authorization', "Bearer " + authToken);
        var options = new http_1.RequestOptions({ headers: headers, withCredentials: true });
        return options;
    };
    UserService.prototype.register = function (email, password, confirmPassword, firstName, lastName, gender) {
        var body = JSON.stringify({ email: email, password: password, confirmPassword: confirmPassword, firstName: firstName, lastName: lastName, gender: gender });
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.post(this.config.apiUrl + '/account/register', body, options)
            .map(function (res) { return true; })
            .catch(this.handleError);
    };
    UserService.prototype.confirmEmail = function (userId, code) {
        var body = JSON.stringify({ userId: userId, code: code });
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.post(this.config.apiUrl + '/account/confirmemail', body, options)
            .map(function (res) { return res; })
            .catch(this.handleError);
    };
    UserService.prototype.updateProfile = function (user) {
        var options = this.getAuthHeaders();
        return this.http.post(this.config.apiUrl + '/account/updateprofile', user, options)
            .map(function (response) {
            var vm = response.json();
            console.log('vm: ' + vm);
            console.log('vm.user: ' + JSON.stringify(vm.user));
            console.log('vm.emailChanged: ' + vm.emailChanged);
            localStorage.setItem('currentUser', JSON.stringify(vm.user));
            if (vm.emailChanged == false) {
            }
            else {
            }
            return vm;
        });
    };
    // private helper methods
    UserService.prototype.jwt = function () {
        // create authorization header with jwt token
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.token) {
            var headers = new http_1.Headers({ 'Authorization': 'Bearer ' + currentUser.token });
            return new http_1.RequestOptions({ headers: headers });
        }
    };
    UserService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.Http, app_config_1.AppConfig])
    ], UserService);
    return UserService;
}(base_service_1.BaseService));
exports.UserService = UserService;


/***/ }),

/***/ "../../../../../src/app/_shared/footer-reveal-button.component.html":
/***/ (function(module, exports) {

module.exports = "<div id=\"footerReveal\">\r\n  <div class=\"row\">\r\n    <div class=\"col\"></div>\r\n    <div class=\"col-1\">\r\n      <button type=\"button\" onclick=\"$(this).tooltip('hide'); $(this).toggleClass('up'); $('#mainPage').toggleClass('out');\" data-toggle=\"tooltip\" data-html=\"true\" title=\"What's up with<br />My Gift Xchange?\" class=\"btn btn-more text-center\"><i class=\"fa fa-2x fa-chevron-down\"></i><i class=\"fa fa-2x fa-chevron-up\"></i></button>\r\n    </div>\r\n    <div class=\"col\"></div>\r\n  </div>\r\n</div>\r\n"

/***/ }),

/***/ "../../../../../src/app/_shared/footer-reveal-button.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/esm5/core.js");
var FooterRevealButtonComponent = (function () {
    function FooterRevealButtonComponent() {
    }
    FooterRevealButtonComponent = __decorate([
        core_1.Component({
            selector: 'footer-reveal-button',
            template: __webpack_require__("../../../../../src/app/_shared/footer-reveal-button.component.html"),
            styleUrls: []
        }),
        __metadata("design:paramtypes", [])
    ], FooterRevealButtonComponent);
    return FooterRevealButtonComponent;
}());
exports.FooterRevealButtonComponent = FooterRevealButtonComponent;


/***/ }),

/***/ "../../../../../src/app/_shared/footer.component.html":
/***/ (function(module, exports) {

module.exports = "<footer id=\"footer\">\r\n  <div class=\"inner\">\r\n    <div class=\"row\">\r\n      <div class=\"col\">\r\n        <h3>Here's what's up with My Gift Xchange</h3>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</footer>\r\n"

/***/ }),

/***/ "../../../../../src/app/_shared/footer.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/esm5/core.js");
var FooterComponent = (function () {
    function FooterComponent() {
    }
    FooterComponent = __decorate([
        core_1.Component({
            selector: 'gx-footer',
            template: __webpack_require__("../../../../../src/app/_shared/footer.component.html"),
            styleUrls: []
        }),
        __metadata("design:paramtypes", [])
    ], FooterComponent);
    return FooterComponent;
}());
exports.FooterComponent = FooterComponent;


/***/ }),

/***/ "../../../../../src/app/_shared/header/header.component.html":
/***/ (function(module, exports) {

module.exports = "<header id=\"profileHeader\">\r\n  <div class=\"row align-items-center justify-content-end\">\r\n    <div class=\"col col-md-3 text-right\">\r\n      <ul class=\"user-nav list-unstyled\" *ngIf=\"isLoggedIn == true && user != null\">\r\n        <li class=\"dropdown\">\r\n          <a href=\"javascript:;\" data-offset=\"0, 17px\" class=\"dropdown-toggle\" role=\"button\" id=\"userMenuLink\"\r\n             data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"false\"><img *ngIf=\"user.photoUrl\" [src]=\"user.photoUrl\" alt=\"My profile pic\" class=\"profile-pic\" /></a>\r\n          <ul class=\"dropdown-menu dropdown-menu-right\" aria-labelledby=\"userMenuLink\">\r\n            <li class=\"dropdown-header\">Signed in as {{user.firstName}} {{user.lastName}}</li>\r\n            <li class=\"dropdown-divider\"></li>\r\n            <li class=\"dropdown-item\"><a [routerLink]=\"['/account/my-profile']\" [queryParams]=\"{ returnUrl : thisUrl }\">My Profile</a></li>\r\n            <li class=\"dropdown-item\"><a href=\"javascript:;\">My groups</a></li>\r\n            <li class=\"dropdown-item\"><a href=\"javascript:;\">My lists</a></li>\r\n            <li class=\"dropdown-divider\"></li>\r\n            <li class=\"dropdown-item\"><a href=\"javascript:;\" (click)=\"logout()\" class=\"logout-button\">Logout</a></li>\r\n          </ul>\r\n        </li>\r\n      </ul>\r\n      <div *ngIf=\"isLoggedIn == false || user === null\">\r\n        <div class=\"register-box\">\r\n          <span class=\"register-text align-middle\">Not a member?</span><a [routerLink]=\"['/register']\" class=\"btn btn-primary btn-register\">Register</a>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</header>\r\n"

/***/ }),

/***/ "../../../../../src/app/_shared/header/header.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/esm5/core.js");
var router_1 = __webpack_require__("../../../router/esm5/router.js");
var authentication_service_1 = __webpack_require__("../../../../../src/app/_services/authentication.service.ts");
var HeaderComponent = (function () {
    function HeaderComponent(route, router, authService) {
        this.route = route;
        this.router = router;
        this.authService = authService;
        this.isLoggedIn = false;
        this.thisUrl = '';
        this.isLoggedIn = authService.isLoggedIn();
        this.thisUrl = this.router.url;
        if (this.isLoggedIn) {
            this.user = authService.getUser();
        }
    }
    HeaderComponent.prototype.ngOnInit = function () {
        console.log('thisurl: ' + this.thisUrl);
    };
    HeaderComponent.prototype.logout = function () {
        this.authService.logout();
        this.user = null;
        this.router.navigate(['/']);
    };
    HeaderComponent = __decorate([
        core_1.Component({
            selector: 'gx-header',
            template: __webpack_require__("../../../../../src/app/_shared/header/header.component.html")
        }),
        __metadata("design:paramtypes", [router_1.ActivatedRoute,
            router_1.Router,
            authentication_service_1.AuthenticationService])
    ], HeaderComponent);
    return HeaderComponent;
}());
exports.HeaderComponent = HeaderComponent;


/***/ }),

/***/ "../../../../../src/app/account/account.component.html":
/***/ (function(module, exports) {

module.exports = "<p>\n  account works!\n</p>\n\n<router-outlet></router-outlet>\n"

/***/ }),

/***/ "../../../../../src/app/account/account.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/account/account.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/esm5/core.js");
var AccountComponent = (function () {
    function AccountComponent() {
    }
    AccountComponent.prototype.ngOnInit = function () {
    };
    AccountComponent = __decorate([
        core_1.Component({
            selector: 'app-account',
            template: __webpack_require__("../../../../../src/app/account/account.component.html"),
            styles: [__webpack_require__("../../../../../src/app/account/account.component.scss")]
        }),
        __metadata("design:paramtypes", [])
    ], AccountComponent);
    return AccountComponent;
}());
exports.AccountComponent = AccountComponent;


/***/ }),

/***/ "../../../../../src/app/account/my-profile/my-profile.component.html":
/***/ (function(module, exports) {

module.exports = "<alert></alert>\r\n\r\n<form name=\"form\" id=\"form\" method=\"post\" (ngSubmit)=\"f.form.valid && updateProfile()\" #f=\"ngForm\" novalidate>\r\n  <input type=\"hidden\" name=\"id\" id=\"id\" [ngModel]=\"user.id\" #id=\"ngModel\" />\r\n  <div class=\"container\">\r\n    <h2>My Profile</h2>\r\n    <div class=\"row\">\r\n      <div class=\"col-xs-12 col-sm-2\">\r\n        <img *ngIf=\"user.photoUrl && !changePic\" [src]=\"user.photoUrl\" alt=\"My profile pic\" class=\"img-fluid img-thumbnail\" style=\"width: 100%; height: auto;\" />\r\n        <gx-profile-pic [picurl]=\"user.photoUrl\" *ngIf=\"changePic\"></gx-profile-pic>\r\n        <p>\r\n          <a href=\"javascript:;\" (click)=\"changePic = true\" [hidden]=\"changePic\">Change my profile pic</a>\r\n          <a href=\"javascript:;\" (click)=\"changePic = false\" [hidden]=\"!changePic\">Cancel</a>\r\n        </p>\r\n      </div>\r\n      <div class=\"col-xs-12 col-sm-7\">\r\n        <h5>About me</h5>\r\n        <div class=\"form-group\" [ngClass]=\"{ 'has-error': f.submitted && !email.valid && !enableEmailUpdate }\">\r\n          <label for=\"email\">Your email address</label>\r\n          <input type=\"email\" class=\"form-control\" name=\"email\" [(ngModel)]=\"user.email\" #email=\"ngModel\" [readonly]=\"!isSocialUser && !enableEmailUpdate\" />\r\n          <a href=\"javascript:;\" (click)=\"enableEmailUpdate = true\" [hidden]=\"enableEmailUpdate\" class=\"form-text text-muted\">update my email</a>\r\n          <a href=\"javascript:;\" (click)=\"enableEmailUpdate = false\" [hidden]=\"!enableEmailUpdate\" class=\"form-text text-muted\">cancel</a>\r\n          <div *ngIf=\"f.submitted && !email.valid && !enableEmailUpdate\" class=\"text-danger\">Email is required</div>\r\n        </div>\r\n        <div class=\"form-group\" [ngClass]=\"{ 'has-error': f.submitted && !firstName.valid }\">\r\n          <label for=\"firstName\">Youe first name</label>\r\n          <input type=\"text\" class=\"form-control\" name=\"firstName\" [(ngModel)]=\"user.firstName\" #firstName=\"ngModel\" required />\r\n          <div *ngIf=\"f.submitted && !firstName.valid\" class=\"text-danger\">First name is required</div>\r\n        </div>\r\n        <div class=\"form-group\" [ngClass]=\"{ 'has-error': f.submitted && !lastName.valid }\">\r\n          <label for=\"lastName\">Youe last name</label>\r\n          <input type=\"text\" class=\"form-control\" name=\"lastName\" [(ngModel)]=\"user.lastName\" #lastName=\"ngModel\" required />\r\n          <div *ngIf=\"f.submitted && !lastName.valid\" class=\"text-danger\">Last name is required</div>\r\n        </div>\r\n        <div class=\"form-group\" [ngClass]=\"{ 'has-error': f.submitted && !birthDate.valid }\">\r\n          <label for=\"birthDate\">Your birth date</label>\r\n          <input type=\"date\" class=\"form-control\" name=\"birthDate\" [ngModel]=\"user.birthDate | date: 'yyyy-MM-dd'\" (ngModelChange)=\"dateChanged($event)\" #birthDate=\"ngModel\"  />\r\n          <div *ngIf=\"f.submitted && !birthDate.valid\" class=\"text-danger\">Birthdate is required</div>\r\n        </div>\r\n        <div class=\"form-group\" [ngClass]=\"{ 'has-error': f.submitted && !male.valid && !female.valid }\">\r\n          <label for=\"gender\">Your gender ... <small>(as stated on your birth certificate)</small></label><br />\r\n          <div class=\"btn-group btn-group-toggle\" data-toggle=\"buttons\">\r\n            <label class=\"btn btn-secondary\" [ngClass]=\"{ 'active' : gender == 'm' }\" (click)=\"gender = 'm'\">\r\n              <input type=\"radio\" name=\"gender\" [value]=\"m\" [(ngModel)]=\"gender\" #male=\"ngModel\" /> Male\r\n            </label>\r\n            <label class=\"btn btn-secondary\" [ngClass]=\"{ 'active' : gender == 'f' }\" (click)=\"gender = 'f'\">\r\n              <input type=\"radio\" name=\"gender\" [value]=\"f\" [(ngModel)]=\"gender\" #female=\"ngModel\" /> Female\r\n            </label>\r\n          </div>\r\n          <div *ngIf=\"f.submitted && !male.valid && !female.valid\" class=\"text-danger\">Gender is required</div>\r\n        </div>\r\n        <div class=\"form-group\">\r\n          <button type=\"submit\" class=\"btn btn-primary\" [disabled]=\"loading\">Update my profile</button>\r\n        </div>\r\n      </div>\r\n      <div class=\"col-xs-12 col-sm-3\" *ngIf=\"isSocialUSer\">\r\n        <h5>Change my password</h5>\r\n        <div class=\"form-group\" [ngClass]=\"{ 'has-error': f.submitted && !password.valid }\">\r\n          <label for=\"password\">Password</label>\r\n          <input type=\"password\" class=\"form-control\" name=\"password\" [(ngModel)]=\"user.password\" #password=\"ngModel\" />\r\n          <div *ngIf=\"f.submitted && !password.valid\" class=\"help-block\">Password is required</div>\r\n        </div>\r\n        <div class=\"form-group\" [ngClass]=\"{ 'has-error': f.submitted && !confirmPassword.valid && confirmPassword == password }\">\r\n          <label for=\"confirmPassword\">Re-type Password</label>\r\n          <input type=\"password\" class=\"form-control\" name=\"confirmPassword\" [(ngModel)]=\"user.confirmPassword\" #confirmPassword=\"ngModel\" />\r\n          <div *ngIf=\"f.submitted && !password.valid\" class=\"help-block\">Password is required</div>\r\n          <div *ngIf=\"f.submitted && confirmPassword != password\">Password does not match</div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n\r\n</form>\r\n"

/***/ }),

/***/ "../../../../../src/app/account/my-profile/my-profile.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/account/my-profile/my-profile.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/esm5/core.js");
var router_1 = __webpack_require__("../../../router/esm5/router.js");
var alert_service_1 = __webpack_require__("../../../../../src/app/_services/alert.service.ts");
var authentication_service_1 = __webpack_require__("../../../../../src/app/_services/authentication.service.ts");
var user_service_1 = __webpack_require__("../../../../../src/app/_services/user.service.ts");
var MyProfileComponent = (function () {
    function MyProfileComponent(route, router, alertService, authService, userService) {
        this.route = route;
        this.router = router;
        this.alertService = alertService;
        this.authService = authService;
        this.userService = userService;
        this.returnUrl = '';
        this.user = {};
        this.gender = '';
        this.loading = false;
        this.isSocialUser = false;
        this.enableEmailUpdate = false;
        this.changePic = false;
        this.user = authService.getUser();
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/home';
    }
    MyProfileComponent.prototype.ngOnInit = function () {
        if (this.user != null) {
            this.isSocialUser = (this.user.facebookid || this.user.twitterId || this.user.googleId);
            this.gender = this.user.gender;
        }
    };
    MyProfileComponent.prototype.dateChanged = function (newDate) {
        this.user.birthDate = new Date(newDate);
    };
    MyProfileComponent.prototype.updateProfile = function () {
        var _this = this;
        this.user.gender = this.gender;
        this.userService.updateProfile(this.user)
            .subscribe(function (data) {
            var s = "";
            if (!data.emailChanged) {
                s = "Profile Updated!";
            }
            else {
                s = "Your email has been updated. Please check your inbox to confirm your new email address.";
            }
            _this.alertService.success(s, true);
            _this.router.navigate([_this.returnUrl]);
        }, function (error) {
            _this.alertService.error('error: ' + error, false);
        });
    };
    MyProfileComponent = __decorate([
        core_1.Component({
            selector: 'app-my-profile',
            template: __webpack_require__("../../../../../src/app/account/my-profile/my-profile.component.html"),
            styles: [__webpack_require__("../../../../../src/app/account/my-profile/my-profile.component.scss")]
        }),
        __metadata("design:paramtypes", [router_1.ActivatedRoute,
            router_1.Router,
            alert_service_1.AlertService,
            authentication_service_1.AuthenticationService,
            user_service_1.UserService])
    ], MyProfileComponent);
    return MyProfileComponent;
}());
exports.MyProfileComponent = MyProfileComponent;


/***/ }),

/***/ "../../../../../src/app/app.component.html":
/***/ (function(module, exports) {

module.exports = "<router-outlet></router-outlet>\r\n\r\n"

/***/ }),

/***/ "../../../../../src/app/app.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/app.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/esm5/core.js");
var http_1 = __webpack_require__("../../../http/esm5/http.js");
var AppComponent = (function () {
    function AppComponent(_httpService) {
        this._httpService = _httpService;
        this.title = 'app';
        this.apiValues = [];
    }
    AppComponent.prototype.ngOnInit = function () {
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: 'app-root',
            template: __webpack_require__("../../../../../src/app/app.component.html"),
            styles: [__webpack_require__("../../../../../src/app/app.component.scss")]
        }),
        __metadata("design:paramtypes", [http_1.Http])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;


/***/ }),

/***/ "../../../../../src/app/app.config.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var AppConfig = (function () {
    function AppConfig() {
        this.apiUrl = '/api';
    }
    AppConfig.prototype.urlRoot = function () {
        var protocol = window.location.protocol;
        var host = window.location.hostname;
        var port = window.location.port;
        return protocol + '//' + host + (port != '80' ? ':' + port : '');
    };
    return AppConfig;
}());
exports.AppConfig = AppConfig;
;


/***/ }),

/***/ "../../../../../src/app/app.module.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var platform_browser_1 = __webpack_require__("../../../platform-browser/esm5/platform-browser.js");
var core_1 = __webpack_require__("../../../core/esm5/core.js");
var app_component_1 = __webpack_require__("../../../../../src/app/app.component.ts");
var home_component_1 = __webpack_require__("../../../../../src/app/home/home.component.ts");
var forms_1 = __webpack_require__("../../../forms/esm5/forms.js");
var http_1 = __webpack_require__("../../../http/esm5/http.js");
var app_routing_1 = __webpack_require__("../../../../../src/app/app.routing.ts");
var alert_component_1 = __webpack_require__("../../../../../src/app/_directives/alert.component.ts");
var index_1 = __webpack_require__("../../../../../src/app/_services/index.ts");
var auth_guard_1 = __webpack_require__("../../../../../src/app/_guards/auth.guard.ts");
var app_config_1 = __webpack_require__("../../../../../src/app/app.config.ts");
var login_component_1 = __webpack_require__("../../../../../src/app/login/login.component.ts");
var register_component_1 = __webpack_require__("../../../../../src/app/register/register.component.ts");
var confirm_email_component_1 = __webpack_require__("../../../../../src/app/confirm-email/confirm-email.component.ts");
var google_signin_component_1 = __webpack_require__("../../../../../src/app/google-signin/google-signin.component.ts");
var privacy_component_1 = __webpack_require__("../../../../../src/app/privacy/privacy.component.ts");
var facebook_signin_component_1 = __webpack_require__("../../../../../src/app/facebook-signin/facebook-signin.component.ts");
var facebook_login_response_component_1 = __webpack_require__("../../../../../src/app/facebook-login-response/facebook-login-response.component.ts");
var twitter_login_response_component_1 = __webpack_require__("../../../../../src/app/twitter-login-response/twitter-login-response.component.ts");
var twitter_auth_component_1 = __webpack_require__("../../../../../src/app/twitter-auth/twitter-auth.component.ts");
var terms_of_service_component_1 = __webpack_require__("../../../../../src/app/terms-of-service/terms-of-service.component.ts");
var header_component_1 = __webpack_require__("../../../../../src/app/_shared/header/header.component.ts");
var footer_component_1 = __webpack_require__("../../../../../src/app/_shared/footer.component.ts");
var footer_reveal_button_component_1 = __webpack_require__("../../../../../src/app/_shared/footer-reveal-button.component.ts");
var groups_service_1 = __webpack_require__("../../../../../src/app/_services/groups.service.ts");
var group_edit_component_1 = __webpack_require__("../../../../../src/app/groups/group-edit.component.ts");
var group_details_component_1 = __webpack_require__("../../../../../src/app/groups/group-details.component.ts");
var lists_service_1 = __webpack_require__("../../../../../src/app/_services/lists.service.ts");
var add_item_component_1 = __webpack_require__("../../../../../src/app/lists/add-item/add-item.component.ts");
var edit_list_component_1 = __webpack_require__("../../../../../src/app/lists/edit-list/edit-list.component.ts");
var lists_component_1 = __webpack_require__("../../../../../src/app/lists/lists/lists.component.ts");
var list_component_1 = __webpack_require__("../../../../../src/app/lists/list/list.component.ts");
var send_invite_component_1 = __webpack_require__("../../../../../src/app/groups/send-invite/send-invite.component.ts");
var accept_invite_component_1 = __webpack_require__("../../../../../src/app/groups/accept-invite/accept-invite.component.ts");
var groups_component_1 = __webpack_require__("../../../../../src/app/groups/groups.component.ts");
var account_component_1 = __webpack_require__("../../../../../src/app/account/account.component.ts");
var my_profile_component_1 = __webpack_require__("../../../../../src/app/account/my-profile/my-profile.component.ts");
var ng2_img_cropper_1 = __webpack_require__("../../../../ng2-img-cropper/index.js");
var profile_pic_component_1 = __webpack_require__("../../../../../src/app/profile-pic/profile-pic.component.ts");
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            declarations: [
                app_component_1.AppComponent,
                home_component_1.HomeComponent,
                alert_component_1.AlertComponent,
                login_component_1.LoginComponent,
                register_component_1.RegisterComponent,
                confirm_email_component_1.ConfirmEmailComponent,
                google_signin_component_1.GoogleSigninComponent,
                privacy_component_1.PrivacyComponent,
                facebook_signin_component_1.FacebookSigninComponent,
                facebook_login_response_component_1.FacebookLoginResponseComponent,
                twitter_login_response_component_1.TwitterLoginResponseComponent,
                twitter_auth_component_1.TwitterAuthComponent,
                terms_of_service_component_1.TermsOfServiceComponent,
                header_component_1.HeaderComponent,
                footer_reveal_button_component_1.FooterRevealButtonComponent,
                footer_component_1.FooterComponent,
                group_edit_component_1.GroupEditComponent,
                group_details_component_1.GroupDetailsComponent,
                add_item_component_1.AddItemComponent,
                edit_list_component_1.EditListComponent,
                lists_component_1.ListsComponent,
                list_component_1.ListComponent,
                send_invite_component_1.SendInviteComponent,
                accept_invite_component_1.AcceptInviteComponent,
                groups_component_1.GroupsComponent,
                account_component_1.AccountComponent,
                my_profile_component_1.MyProfileComponent,
                ng2_img_cropper_1.ImageCropperComponent,
                profile_pic_component_1.ProfilePicComponent
            ],
            imports: [
                platform_browser_1.BrowserModule,
                forms_1.FormsModule,
                http_1.HttpModule,
                app_routing_1.routing
            ],
            providers: [
                app_config_1.AppConfig,
                index_1.AlertService,
                auth_guard_1.AuthGuard,
                index_1.AuthenticationService,
                groups_service_1.GroupsService,
                lists_service_1.ListsService,
                index_1.UserService
            ],
            bootstrap: [app_component_1.AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;


/***/ }),

/***/ "../../../../../src/app/app.routing.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var router_1 = __webpack_require__("../../../router/esm5/router.js");
var home_component_1 = __webpack_require__("../../../../../src/app/home/home.component.ts");
var login_component_1 = __webpack_require__("../../../../../src/app/login/login.component.ts");
var register_component_1 = __webpack_require__("../../../../../src/app/register/register.component.ts");
var confirm_email_component_1 = __webpack_require__("../../../../../src/app/confirm-email/confirm-email.component.ts");
var google_signin_component_1 = __webpack_require__("../../../../../src/app/google-signin/google-signin.component.ts");
var privacy_component_1 = __webpack_require__("../../../../../src/app/privacy/privacy.component.ts");
var facebook_login_response_component_1 = __webpack_require__("../../../../../src/app/facebook-login-response/facebook-login-response.component.ts");
var twitter_login_response_component_1 = __webpack_require__("../../../../../src/app/twitter-login-response/twitter-login-response.component.ts");
var twitter_auth_component_1 = __webpack_require__("../../../../../src/app/twitter-auth/twitter-auth.component.ts");
var terms_of_service_component_1 = __webpack_require__("../../../../../src/app/terms-of-service/terms-of-service.component.ts");
var auth_guard_1 = __webpack_require__("../../../../../src/app/_guards/auth.guard.ts");
var group_edit_component_1 = __webpack_require__("../../../../../src/app/groups/group-edit.component.ts");
var group_details_component_1 = __webpack_require__("../../../../../src/app/groups/group-details.component.ts");
var lists_component_1 = __webpack_require__("../../../../../src/app/lists/lists/lists.component.ts");
var edit_list_component_1 = __webpack_require__("../../../../../src/app/lists/edit-list/edit-list.component.ts");
var list_component_1 = __webpack_require__("../../../../../src/app/lists/list/list.component.ts");
var add_item_component_1 = __webpack_require__("../../../../../src/app/lists/add-item/add-item.component.ts");
var groups_component_1 = __webpack_require__("../../../../../src/app/groups/groups.component.ts");
var send_invite_component_1 = __webpack_require__("../../../../../src/app/groups/send-invite/send-invite.component.ts");
var accept_invite_component_1 = __webpack_require__("../../../../../src/app/groups/accept-invite/accept-invite.component.ts");
var account_component_1 = __webpack_require__("../../../../../src/app/account/account.component.ts");
var my_profile_component_1 = __webpack_require__("../../../../../src/app/account/my-profile/my-profile.component.ts");
var appRoutes = [
    { path: '', component: login_component_1.LoginComponent },
    {
        path: 'account', component: account_component_1.AccountComponent, canActivate: [auth_guard_1.AuthGuard],
        children: [
            { path: 'my-profile', component: my_profile_component_1.MyProfileComponent }
        ]
    },
    { path: 'home', component: home_component_1.HomeComponent, canActivate: [auth_guard_1.AuthGuard] },
    { path: 'register', component: register_component_1.RegisterComponent },
    { path: 'gauth', component: google_signin_component_1.GoogleSigninComponent },
    { path: 'group/:id', component: group_details_component_1.GroupDetailsComponent, canActivate: [auth_guard_1.AuthGuard] },
    {
        path: 'lists', component: lists_component_1.ListsComponent, canActivate: [auth_guard_1.AuthGuard],
        children: [
            { path: 'add-item/:id', component: add_item_component_1.AddItemComponent },
            { path: 'edit/:id', component: edit_list_component_1.EditListComponent },
            { path: 'list/:id', component: list_component_1.ListComponent },
        ]
    },
    { path: 'confirm-email', component: confirm_email_component_1.ConfirmEmailComponent },
    { path: 'privacy', component: privacy_component_1.PrivacyComponent },
    { path: 'facebook-login', component: facebook_login_response_component_1.FacebookLoginResponseComponent },
    { path: 'twitter-login', component: twitter_login_response_component_1.TwitterLoginResponseComponent },
    { path: 'signin-twitter', component: twitter_auth_component_1.TwitterAuthComponent },
    { path: 'terms', component: terms_of_service_component_1.TermsOfServiceComponent },
    {
        path: 'groups', component: groups_component_1.GroupsComponent, canActivate: [auth_guard_1.AuthGuard],
        children: [
            { path: 'send-invite/:id', component: send_invite_component_1.SendInviteComponent },
            { path: 'edit/:id', component: group_edit_component_1.GroupEditComponent },
            { path: 'accept-invite/:guid', component: accept_invite_component_1.AcceptInviteComponent },
        ]
    },
    { path: '**', redirectTo: '' }
];
exports.routing = router_1.RouterModule.forRoot(appRoutes);


/***/ }),

/***/ "../../../../../src/app/confirm-email/confirm-email.component.html":
/***/ (function(module, exports) {

module.exports = "<p>\r\n  confirm-email works!\r\n</p>\r\n"

/***/ }),

/***/ "../../../../../src/app/confirm-email/confirm-email.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/confirm-email/confirm-email.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/esm5/core.js");
var router_1 = __webpack_require__("../../../router/esm5/router.js");
__webpack_require__("../../../../rxjs/_esm5/add/operator/switchMap.js");
var user_service_1 = __webpack_require__("../../../../../src/app/_services/user.service.ts");
var alert_service_1 = __webpack_require__("../../../../../src/app/_services/alert.service.ts");
var ConfirmEmailComponent = (function () {
    function ConfirmEmailComponent(route, router, userService, alertService) {
        this.route = route;
        this.router = router;
        this.userService = userService;
        this.alertService = alertService;
        this.userId = "";
        this.code = "";
    }
    ConfirmEmailComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.queryParams.subscribe(function (params) {
            _this.userId = params['userId'];
            _this.code = params['code'];
        });
        //console.log('userId: ' + this.userId);
        //console.log('code: ' + this.code);
        if (this.userId && this.code) {
            this.userService.confirmEmail(this.userId, this.code).
                subscribe(function (data) {
                _this.alertService.success('Your email has been confirmed. You may now log in.', true);
                _this.router.navigate(['/login']);
            }, function (error) {
                _this.alertService.error('There was an error: ' + error, false);
            });
        }
    };
    ConfirmEmailComponent = __decorate([
        core_1.Component({
            selector: 'app-confirm-email',
            template: __webpack_require__("../../../../../src/app/confirm-email/confirm-email.component.html"),
            styles: [__webpack_require__("../../../../../src/app/confirm-email/confirm-email.component.scss")]
        }),
        __metadata("design:paramtypes", [router_1.ActivatedRoute,
            router_1.Router,
            user_service_1.UserService,
            alert_service_1.AlertService])
    ], ConfirmEmailComponent);
    return ConfirmEmailComponent;
}());
exports.ConfirmEmailComponent = ConfirmEmailComponent;


/***/ }),

/***/ "../../../../../src/app/facebook-login-response/facebook-login-response.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"text-center\"><i class=\"fa-3x fas fa-spinner fa-pulse\"></i></div>\n"

/***/ }),

/***/ "../../../../../src/app/facebook-login-response/facebook-login-response.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/facebook-login-response/facebook-login-response.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/esm5/core.js");
var authentication_service_1 = __webpack_require__("../../../../../src/app/_services/authentication.service.ts");
var alert_service_1 = __webpack_require__("../../../../../src/app/_services/alert.service.ts");
var http_1 = __webpack_require__("../../../http/esm5/http.js");
var router_1 = __webpack_require__("../../../router/esm5/router.js");
var FacebookLoginResponseComponent = (function () {
    function FacebookLoginResponseComponent(route, alertService, router, http, authService) {
        var _this = this;
        this.route = route;
        this.alertService = alertService;
        this.router = router;
        this.http = http;
        this.authService = authService;
        this.accessToken = '';
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/home';
        //console.log('constructor');
        this.accessToken = this.getParameterByName("access_token", window.location.href);
        if (this.accessToken != '') {
            this.authService.facebookLogin(this.accessToken)
                .subscribe(function (data) {
                if (data == true) {
                    window.opener.document.location.href = _this.returnUrl;
                    //window.parent.focus();
                    window.close();
                }
            }, function (error) {
                _this.alertService.error('There was an error: ' + error, false);
            });
        }
        //this.route.queryParams.subscribe(params => {
        //  this.accessToken = params['access_token'];
        //  this.exipresIn = params['expires_in'];
        //  console.log('#access_token: ' + params['#access_token']);
        //});
    }
    FacebookLoginResponseComponent.prototype.getParameterByName = function (name, url) {
        name = name.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&#]" + name + "(=([^&#]*)|&|#|$)"), results = regex.exec(url);
        if (!results)
            return null;
        if (!results[2])
            return '';
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    };
    FacebookLoginResponseComponent.prototype.ngOnInit = function () {
    };
    FacebookLoginResponseComponent = __decorate([
        core_1.Component({
            selector: 'app-facebook-login-response',
            template: __webpack_require__("../../../../../src/app/facebook-login-response/facebook-login-response.component.html"),
            styles: [__webpack_require__("../../../../../src/app/facebook-login-response/facebook-login-response.component.scss")]
        }),
        __metadata("design:paramtypes", [router_1.ActivatedRoute, alert_service_1.AlertService, router_1.Router, http_1.Http,
            authentication_service_1.AuthenticationService])
    ], FacebookLoginResponseComponent);
    return FacebookLoginResponseComponent;
}());
exports.FacebookLoginResponseComponent = FacebookLoginResponseComponent;


/***/ }),

/***/ "../../../../../src/app/facebook-signin/facebook-signin.component.html":
/***/ (function(module, exports) {

module.exports = "<button class=\"btn btn-primary btn-social align-middle\" (click)=\"launchFbLogin()\"><i class=\"fab fa-facebook-f\"></i></button>\r\n"

/***/ }),

/***/ "../../../../../src/app/facebook-signin/facebook-signin.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/facebook-signin/facebook-signin.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/esm5/core.js");
var authentication_service_1 = __webpack_require__("../../../../../src/app/_services/authentication.service.ts");
var alert_service_1 = __webpack_require__("../../../../../src/app/_services/alert.service.ts");
var http_1 = __webpack_require__("../../../http/esm5/http.js");
var router_1 = __webpack_require__("../../../router/esm5/router.js");
var app_config_1 = __webpack_require__("../../../../../src/app/app.config.ts");
var FacebookSigninComponent = (function () {
    function FacebookSigninComponent(route, alertService, router, http, authService, appConfig) {
        this.route = route;
        this.alertService = alertService;
        this.router = router;
        this.http = http;
        this.authService = authService;
        this.appConfig = appConfig;
        this.siteUrl = '';
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
        this.siteUrl = this.appConfig.urlRoot();
        //console.log('siteUrl: ' + this.siteUrl);
    }
    FacebookSigninComponent.prototype.launchFbLogin = function () {
        // launch facebook login dialog
        this.authWindow = window.open("https://www.facebook.com/v2.11/dialog/oauth?&response_type=token&display=popup&client_id=189190551632736&display=popup&redirect_uri=" + this.siteUrl + "/facebook-login&scope=email", null, 'width=600,height=400');
    };
    FacebookSigninComponent.prototype.ngOnInit = function () {
    };
    FacebookSigninComponent = __decorate([
        core_1.Component({
            selector: 'facebook-signin',
            template: __webpack_require__("../../../../../src/app/facebook-signin/facebook-signin.component.html"),
            styles: [__webpack_require__("../../../../../src/app/facebook-signin/facebook-signin.component.scss")]
        }),
        __metadata("design:paramtypes", [router_1.ActivatedRoute, alert_service_1.AlertService, router_1.Router, http_1.Http,
            authentication_service_1.AuthenticationService, app_config_1.AppConfig])
    ], FacebookSigninComponent);
    return FacebookSigninComponent;
}());
exports.FacebookSigninComponent = FacebookSigninComponent;


/***/ }),

/***/ "../../../../../src/app/google-signin/google-signin.component.html":
/***/ (function(module, exports) {

module.exports = "<button type=\"button\" id=\"googleBtn\" class=\"btn btn-primary btn-social align-middle\"><i class=\"fab fa-google-plus-g\"></i></button>\r\n"

/***/ }),

/***/ "../../../../../src/app/google-signin/google-signin.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/google-signin/google-signin.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/esm5/core.js");
var authentication_service_1 = __webpack_require__("../../../../../src/app/_services/authentication.service.ts");
var router_1 = __webpack_require__("../../../router/esm5/router.js");
var alert_service_1 = __webpack_require__("../../../../../src/app/_services/alert.service.ts");
var GoogleSigninComponent = (function () {
    function GoogleSigninComponent(element, _authService, route, router, alertService) {
        this.element = element;
        this._authService = _authService;
        this.route = route;
        this.router = router;
        this.alertService = alertService;
        this.clientId = '609698562138-k40il43lrugkc890rjehpkvjovqrbu8u.apps.googleusercontent.com';
        this.clientSecret = 'YZL1AIL_CP_tIL8gZFpRxq8Q';
        this.scope = [
            'profile',
            'email',
            'https://www.googleapis.com/auth/plus.me',
            'https://www.googleapis.com/auth/contacts.readonly',
            'https://www.googleapis.com/auth/admin.directory.user.readonly'
        ].join(' ');
        //console.log('ElementRef: ', this.element);
        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }
    GoogleSigninComponent.prototype.googleInit = function () {
        var that = this;
        gapi.load('auth2', function () {
            that.auth2 = gapi.auth2.init({
                client_id: that.clientId,
                cookiepolicy: 'single_host_origin',
                scope: that.scope
            });
            that.attachSignin(that.element.nativeElement.firstChild);
        });
    };
    GoogleSigninComponent.prototype.attachSignin = function (element) {
        var that = this;
        this.auth2.attachClickHandler(element, {}, function (googleUser) {
            var profile = googleUser.getBasicProfile();
            var token = googleUser.getAuthResponse().id_token;
            var id = profile.getId();
            var name = profile.getName();
            var photoUrl = profile.getImageUrl();
            var email = profile.getEmail();
            //console.log('Token || ' + token);
            //console.log('ID: ' + id);
            //console.log('Name: ' + name);
            //console.log('Image URL: ' + photoUrl);
            //console.log('Email: ' + email);
            //YOUR CODE HERE
            that._authService.googleLogin(email, name, id, photoUrl, token)
                .subscribe(function (data) {
                //that.router.navigate([that.returnUrl]);
                document.location.href = that.returnUrl;
            }, function (error) {
                that.alertService.error('There was an error: ' + error);
            });
        }, function (error) {
            console.log(JSON.stringify(error, undefined, 2));
        });
    };
    GoogleSigninComponent.prototype.ngAfterViewInit = function () {
        this.googleInit();
    };
    GoogleSigninComponent = __decorate([
        core_1.Component({
            selector: 'google-signin',
            template: __webpack_require__("../../../../../src/app/google-signin/google-signin.component.html"),
            styles: [__webpack_require__("../../../../../src/app/google-signin/google-signin.component.scss")]
        }),
        __metadata("design:paramtypes", [core_1.ElementRef, authentication_service_1.AuthenticationService,
            router_1.ActivatedRoute,
            router_1.Router, alert_service_1.AlertService])
    ], GoogleSigninComponent);
    return GoogleSigninComponent;
}());
exports.GoogleSigninComponent = GoogleSigninComponent;


/***/ }),

/***/ "../../../../../src/app/groups/accept-invite/accept-invite.component.html":
/***/ (function(module, exports) {

module.exports = "<p>\n  accept-invite works!\n</p>\n\nGUId: {{guid}}\n"

/***/ }),

/***/ "../../../../../src/app/groups/accept-invite/accept-invite.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/groups/accept-invite/accept-invite.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/esm5/core.js");
var router_1 = __webpack_require__("../../../router/esm5/router.js");
var authentication_service_1 = __webpack_require__("../../../../../src/app/_services/authentication.service.ts");
var alert_service_1 = __webpack_require__("../../../../../src/app/_services/alert.service.ts");
var groups_service_1 = __webpack_require__("../../../../../src/app/_services/groups.service.ts");
var AcceptInviteComponent = (function () {
    function AcceptInviteComponent(route, router, alertService, authService, groupsService) {
        this.route = route;
        this.router = router;
        this.alertService = alertService;
        this.authService = authService;
        this.groupsService = groupsService;
        this.loading = false;
        this.returnUrl = '';
        this.currentUser = authService.getUser();
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/home';
    }
    AcceptInviteComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (this.currentUser != null) {
            this.guid = this.route.snapshot.paramMap.get('guid');
            this.groupsService.getInvite(this.guid)
                .subscribe(function (data) {
                _this.invite = data;
                if (_this.invite != null) {
                    var vm = {
                        guid: _this.invite.guid,
                    };
                    _this.groupsService.acceptInvite(vm)
                        .subscribe(function (data) {
                        if (data.statusText == "Success") {
                            _this.alertService.success("You have successfully joined " + _this.group.name, true);
                            _this.router.navigate(["/group/" + _this.group.id]);
                        }
                    }, function (error) {
                        _this.alertService.error("There was an error: " + error);
                    });
                }
            }, function (error) {
                _this.alertService.error("There was an error: " + error);
            });
        }
    };
    AcceptInviteComponent = __decorate([
        core_1.Component({
            selector: 'app-accept-invite',
            template: __webpack_require__("../../../../../src/app/groups/accept-invite/accept-invite.component.html"),
            styles: [__webpack_require__("../../../../../src/app/groups/accept-invite/accept-invite.component.scss")]
        }),
        __metadata("design:paramtypes", [router_1.ActivatedRoute,
            router_1.Router,
            alert_service_1.AlertService,
            authentication_service_1.AuthenticationService,
            groups_service_1.GroupsService])
    ], AcceptInviteComponent);
    return AcceptInviteComponent;
}());
exports.AcceptInviteComponent = AcceptInviteComponent;


/***/ }),

/***/ "../../../../../src/app/groups/group-details.component.html":
/***/ (function(module, exports) {

module.exports = "<gx-header></gx-header>\r\n\r\n<div id=\"mainPage\">\r\n\r\n  <alert></alert>\r\n\r\n  <div class=\"page-container\" *ngIf=\"group\">\r\n    <p><a [routerLink]=\"['/home']\"><i class=\"fa fa-home\"></i> Home</a></p>\r\n    <h2>{{group.name}}</h2>\r\n    <div *ngIf=\"group && group.description\">\r\n      {{group.description}}\r\n    </div>\r\n\r\n    <div>\r\n      {{group.owner.userName}}\r\n    </div>\r\n    <div *ngIf=\"members && members.length > 0\">\r\n      <div *ngFor=\"let member of members\">\r\n        {{member.member.userName}}\r\n      </div>\r\n    </div>\r\n    <div class=\"alert alert-warning\" *ngIf=\"!members || members.length == 0\">\r\n      No members\r\n    </div>\r\n\r\n    <p><a routerLink=\"/groups/send-invite/{{group.id}}\">Send an invite</a></p>\r\n    <p [ngStyle]=\"{ 'display' : currentUser.id != group.ownerId ? 'none' : 'auto' }\"><a routerLink=\"/groups/edit/{{group.id}}\">Edit this group</a></p>\r\n\r\n  </div>\r\n\r\n\r\n  <footer-reveal-button></footer-reveal-button>\r\n\r\n  <div class=\"body-bg\"></div>\r\n</div>\r\n\r\n<gx-footer></gx-footer>\r\n"

/***/ }),

/***/ "../../../../../src/app/groups/group-details.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/esm5/core.js");
var router_1 = __webpack_require__("../../../router/esm5/router.js");
var index_1 = __webpack_require__("../../../../../src/app/_services/index.ts");
var groups_service_1 = __webpack_require__("../../../../../src/app/_services/groups.service.ts");
var alert_service_1 = __webpack_require__("../../../../../src/app/_services/alert.service.ts");
var GroupDetailsComponent = (function () {
    function GroupDetailsComponent(route, router, alertService, authService, groupsService) {
        this.route = route;
        this.router = router;
        this.alertService = alertService;
        this.authService = authService;
        this.groupsService = groupsService;
        this.id = -1;
        this.members = [];
        this.currentUser = authService.getUser();
        if (this.currentUser == null) {
            this.router.navigate(['/']);
        }
    }
    GroupDetailsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.id = parseInt(this.route.snapshot.paramMap.get('id'));
        console.log(this.route.snapshot.paramMap);
        console.log(this.id);
        //this.route.queryParams.subscribe(params => {
        //  this.id = params['id'];
        if (this.id > 0) {
            this.groupsService.getGroup(this.id.toString())
                .subscribe(function (data) {
                _this.group = data;
                if (_this.group != null) {
                    _this.groupsService.getMembers(_this.group.id)
                        .subscribe(function (data) {
                        _this.members = data;
                    }, function (error) {
                    });
                }
            }, function (error) {
                _this.alertService.error('error: ' + error, false);
            });
        }
        //});
    };
    GroupDetailsComponent = __decorate([
        core_1.Component({
            selector: 'group-details',
            template: __webpack_require__("../../../../../src/app/groups/group-details.component.html")
        }),
        __metadata("design:paramtypes", [router_1.ActivatedRoute,
            router_1.Router,
            alert_service_1.AlertService,
            index_1.AuthenticationService,
            groups_service_1.GroupsService])
    ], GroupDetailsComponent);
    return GroupDetailsComponent;
}());
exports.GroupDetailsComponent = GroupDetailsComponent;


/***/ }),

/***/ "../../../../../src/app/groups/group-edit.component.html":
/***/ (function(module, exports) {

module.exports = "<form name=\"form\" (ngSubmit)=\"f.form.valid && saveGroup()\" #f=\"ngForm\" novalidate>\r\n  <input type=\"hidden\" name=\"id\" id=\"id\" [ngModel]=\"group.id\" #id=\"ngModel\" />\r\n  <div class=\"form-group\">\r\n    <label>Created on</label>\r\n    <span class=\"form-text\">{{group.dateCreated}}</span>\r\n  </div>\r\n  <div class=\"form-group\" [ngClass]=\"{ 'has-error': f.submitted && !name.valid }\">\r\n    <label>Name</label>\r\n    <input type=\"text\" name=\"name\" id=\"name\" class=\"form-control\" [(ngModel)]=\"group.name\" #name=\"ngModel\" required />\r\n    <div *ngIf=\"f.submitted && !name.valid\" class=\"help-block\">Name is required</div>\r\n  </div>\r\n  <div class=\"form-group\" [ngClass]=\"{ 'has-error': f.submitted && !slug.valid }\">\r\n    <label>Slug</label>\r\n    <input type=\"text\" name=\"slug\" id=\"slug\" class=\"form-control\" [(ngModel)]=\"group.slug\" #slug=\"ngModel\" required />\r\n    <div *ngIf=\"f.submitted && !slug.valid\" class=\"help-block\">Slug is required</div>\r\n  </div>\r\n  <div class=\"form-group\">\r\n    <label>Description</label>\r\n    <textarea id=\"description\" name=\"description\" [(ngModel)]=\"group.description\" #description=\"ngModel\" class=\"form-control\"></textarea>\r\n  </div>\r\n  <div class=\"form-group\">\r\n    <button type=\"submit\" [disabled]=\"loading\" class=\"btn btn-primary\">Save Group</button>\r\n  </div>\r\n</form>\r\n"

/***/ }),

/***/ "../../../../../src/app/groups/group-edit.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/esm5/core.js");
var router_1 = __webpack_require__("../../../router/esm5/router.js");
var authentication_service_1 = __webpack_require__("../../../../../src/app/_services/authentication.service.ts");
var alert_service_1 = __webpack_require__("../../../../../src/app/_services/alert.service.ts");
var groups_service_1 = __webpack_require__("../../../../../src/app/_services/groups.service.ts");
var GroupEditComponent = (function () {
    function GroupEditComponent(route, router, alertService, authService, groupsService) {
        this.route = route;
        this.router = router;
        this.alertService = alertService;
        this.authService = authService;
        this.groupsService = groupsService;
        this.group = {
            dateCreated: new Date()
        };
        this.groups = [];
        this.id = -1;
        this.loading = false;
        this.currentUser = authService.getUser();
    }
    GroupEditComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (this.currentUser != null) {
            this.id = parseInt(this.route.snapshot.paramMap.get('id'));
            if (this.id > 0) {
                this.groupsService.getGroup(this.id.toString())
                    .subscribe(function (data) {
                    _this.group = data;
                }, function (error) {
                    _this.alertService.error('error: ' + error, false);
                });
            }
        }
    };
    GroupEditComponent.prototype.saveGroup = function () {
        var _this = this;
        this.loading = true;
        this.groupsService.saveGroup(this.group)
            .subscribe(function (data) {
            _this.alertService.success("Your account has been created. You may now log in.", true);
            _this.router.navigate(['/home']);
        }, function (error) {
            _this.loading = false;
            _this.alertService.error("There was an error: " + error, false);
        });
    };
    GroupEditComponent = __decorate([
        core_1.Component({
            selector: 'group-edit',
            template: __webpack_require__("../../../../../src/app/groups/group-edit.component.html")
        }),
        __metadata("design:paramtypes", [router_1.ActivatedRoute,
            router_1.Router,
            alert_service_1.AlertService,
            authentication_service_1.AuthenticationService,
            groups_service_1.GroupsService])
    ], GroupEditComponent);
    return GroupEditComponent;
}());
exports.GroupEditComponent = GroupEditComponent;


/***/ }),

/***/ "../../../../../src/app/groups/groups.component.html":
/***/ (function(module, exports) {

module.exports = "<alert></alert>\n<p>\n  groups works!\n</p>\n<router-outlet></router-outlet>\n"

/***/ }),

/***/ "../../../../../src/app/groups/groups.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/groups/groups.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/esm5/core.js");
var GroupsComponent = (function () {
    function GroupsComponent() {
    }
    GroupsComponent.prototype.ngOnInit = function () {
    };
    GroupsComponent = __decorate([
        core_1.Component({
            selector: 'app-groups',
            template: __webpack_require__("../../../../../src/app/groups/groups.component.html"),
            styles: [__webpack_require__("../../../../../src/app/groups/groups.component.scss")]
        }),
        __metadata("design:paramtypes", [])
    ], GroupsComponent);
    return GroupsComponent;
}());
exports.GroupsComponent = GroupsComponent;


/***/ }),

/***/ "../../../../../src/app/groups/send-invite/send-invite.component.html":
/***/ (function(module, exports) {

module.exports = "<div *ngIf=\"group\">\r\n  <h2>Invite someone to the group {{invite.name}}</h2>\r\n  <form method=\"post\" name=\"form\" (ngSubmit)=\"f.form.valid && sendInvite()\" #f=\"ngForm\" novalidate>\r\n    <input type=\"hidden\" name=\"groupId\" id=\"groupId\" [ngModel]=\"invite.groupId\" #groupId=\"ngModel\" />\r\n    <div class=\"form-group\" [ngClass]=\"{ 'has-error': f.submitted && !emailAddress.valid }\">\r\n      <label>Email Address</label>\r\n      <input type=\"email\" id=\"emailAddress\" name=\"emailAddress\" class=\"form-control\" [(ngModel)]=\"invite.emailAddress\" #emailAddress=\"ngModel\" />\r\n    </div>\r\n    <div class=\"form-group\" [ngClass]=\"{ 'has-error': f.submitted && !message.valid }\">\r\n      <label>Message</label>\r\n      <textarea name=\"message\" id=\"message\" class=\"form-control\" [(ngModel)]=\"invite.message\" #message=\"ngModel\"></textarea>\r\n    </div>\r\n    <div class=\"form-group\">\r\n      <button type=\"submit\" [disabled]=\"loading\" class=\"btn btn-primary\">Send invitation</button>\r\n    </div>\r\n  </form>\r\n</div>\r\n\r\n"

/***/ }),

/***/ "../../../../../src/app/groups/send-invite/send-invite.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/esm5/core.js");
var router_1 = __webpack_require__("../../../router/esm5/router.js");
var authentication_service_1 = __webpack_require__("../../../../../src/app/_services/authentication.service.ts");
var alert_service_1 = __webpack_require__("../../../../../src/app/_services/alert.service.ts");
var groups_service_1 = __webpack_require__("../../../../../src/app/_services/groups.service.ts");
var SendInviteComponent = (function () {
    function SendInviteComponent(route, router, alertService, authService, groupsService) {
        this.route = route;
        this.router = router;
        this.alertService = alertService;
        this.authService = authService;
        this.groupsService = groupsService;
        this.invite = {};
        this.loading = false;
        this.currentUser = authService.getUser();
    }
    SendInviteComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (this.currentUser != null) {
            this.id = parseInt(this.route.snapshot.paramMap.get('id'));
            if (this.id > 0) {
                this.groupsService.getGroup(this.id.toString())
                    .subscribe(function (data) {
                    _this.group = data;
                    _this.invite.groupId = _this.group.id;
                    _this.invite.invitedBy = _this.currentUser.id;
                }, function (error) {
                    _this.alertService.error('error: ' + error, false);
                });
            }
        }
    };
    SendInviteComponent.prototype.sendInvite = function () {
        var _this = this;
        console.log('send invite');
        this.loading = true;
        var x = this.invite;
        console.log('this.invite.groupId: ' + this.invite.groupId);
        this.groupsService.inviteMember(x)
            .subscribe(function (data) {
            _this.alertService.success('Invite sent!', true);
            _this.router.navigate(['/group/' + _this.id]);
        }, function (error) {
            _this.alertService.error('Error: ' + error, false);
        });
    };
    SendInviteComponent = __decorate([
        core_1.Component({
            selector: 'app-send-invite',
            template: __webpack_require__("../../../../../src/app/groups/send-invite/send-invite.component.html")
        }),
        __metadata("design:paramtypes", [router_1.ActivatedRoute,
            router_1.Router,
            alert_service_1.AlertService,
            authentication_service_1.AuthenticationService,
            groups_service_1.GroupsService])
    ], SendInviteComponent);
    return SendInviteComponent;
}());
exports.SendInviteComponent = SendInviteComponent;


/***/ }),

/***/ "../../../../../src/app/home/home.component.html":
/***/ (function(module, exports) {

module.exports = "<gx-header></gx-header>\r\n\r\n<div id=\"mainPage\">\r\n\r\n  <div class=\"page-container\" id=\"home\">\r\n\r\n\r\n\r\n    <h2>Home</h2>\r\n\r\n    <div class=\"container\">\r\n      <div class=\"row\">\r\n        <div class=\"col col-md-6\">\r\n          <h3>My Groups</h3>\r\n          <div class=\"card-deck\">\r\n            <div class=\"card\" *ngFor=\"let group of groups\">\r\n              <div class=\"card-body\">\r\n                <h5 class=\"card-title\">{{group.name}}</h5>\r\n                <p class=\"card-context\" *ngIf=\"group.description.length > 0\">{{group.description}}</p>\r\n                <a class=\"card-link\" routerLink=\"/group/{{group.id}}\">Go to Group</a>\r\n              </div>\r\n            </div>\r\n          </div>\r\n          <a [routerLink]=\"['/groups/edit/-1']\">Add a new group</a>\r\n        </div>\r\n        <div class=\"col col-md-4\">\r\n          <h3>My Lists</h3>\r\n          <div class=\"\">\r\n            <div class=\"card\" *ngFor=\"let list of lists\">\r\n              <div class=\"card-body\">\r\n                <h5 class=\"card-title\">{{list.name}}</h5>\r\n                <div class=\"card-context\">\r\n                  <ul *ngIf=\"list.items && list.items.length > 0\">\r\n                    <li *ngFor=\"let item of list.items\">\r\n                      {{item.name}}\r\n                    </li>\r\n                  </ul>\r\n                  <a class=\"card-link\" routerLink=\"/lists/add-item/{{list.id}}\">Add an item</a>\r\n                </div>\r\n                <a class=\"card-link\" routerLink=\"/lists/list/{{list.id}}\">Go to List</a>\r\n              </div>\r\n            </div>\r\n          </div>\r\n          <a [routerLink]=\"['/lists/edit/-1']\">Add a new list</a>\r\n        </div>\r\n        <div class=\"col col-sm-2\">\r\n\r\n        </div>\r\n      </div>\r\n    </div>\r\n\r\n\r\n  </div>\r\n\r\n  <footer-reveal-button></footer-reveal-button>\r\n\r\n  <div class=\"body-bg\"></div>\r\n</div>\r\n\r\n<gx-footer></gx-footer>\r\n"

/***/ }),

/***/ "../../../../../src/app/home/home.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/home/home.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/esm5/core.js");
var router_1 = __webpack_require__("../../../router/esm5/router.js");
var index_1 = __webpack_require__("../../../../../src/app/_services/index.ts");
var groups_service_1 = __webpack_require__("../../../../../src/app/_services/groups.service.ts");
var alert_service_1 = __webpack_require__("../../../../../src/app/_services/alert.service.ts");
var lists_service_1 = __webpack_require__("../../../../../src/app/_services/lists.service.ts");
var HomeComponent = (function () {
    function HomeComponent(route, router, alertService, authService, groupsService, listsService) {
        //this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.route = route;
        this.router = router;
        this.alertService = alertService;
        this.authService = authService;
        this.groupsService = groupsService;
        this.listsService = listsService;
        this.users = [];
        this.groups = [];
        this.lists = [];
        //authGuard.canActivate(this.route.snapshot, this.state.snapshot)
        this.currentUser = authService.getUser();
    }
    HomeComponent.prototype.ngOnInit = function () {
        //if (!this.authService.isLoggedIn()) {
        //  this.router.navigate(['/']);
        //}
        var _this = this;
        if (this.currentUser != null) {
            this.groupsService.getGroups()
                .subscribe(function (data) {
                _this.groups = data;
            }, function (error) {
                _this.alertService.error('Error loading groups: ' + error, false);
            });
            this.listsService.getLists()
                .subscribe(function (data) {
                _this.lists = data;
            }, function (error) {
                _this.alertService.error('Error loading lists: ' + error, false);
            });
        }
    };
    HomeComponent.prototype.logout = function () {
        this.authService.logout();
        this.currentUser = null;
        this.router.navigate(['/']);
    };
    HomeComponent = __decorate([
        core_1.Component({
            selector: 'app-home',
            template: __webpack_require__("../../../../../src/app/home/home.component.html"),
            styles: [__webpack_require__("../../../../../src/app/home/home.component.scss")]
        }),
        __metadata("design:paramtypes", [router_1.ActivatedRoute,
            router_1.Router,
            alert_service_1.AlertService,
            index_1.AuthenticationService,
            groups_service_1.GroupsService,
            lists_service_1.ListsService])
    ], HomeComponent);
    return HomeComponent;
}());
exports.HomeComponent = HomeComponent;


/***/ }),

/***/ "../../../../../src/app/lists/add-item/add-item.component.html":
/***/ (function(module, exports) {

module.exports = "<div *ngIf=\"list\">\r\n  <h2>Add an item to {{list.name}}</h2>\r\n  <form name=\"form\" (ngSubmit)=\"f.form.valid && saveitem()\" #f=\"ngForm\" novalidate>\r\n    <input type=\"hidden\" name=\"listId\" id=\"listId\" [ngModel]=\"item.listId\" #listId=\"ngModel\" />\r\n    <div class=\"form-group\">\r\n      <label>Created on</label>\r\n      <span class=\"form-text\">{{item.dateCreated}}</span>\r\n    </div>\r\n    <div class=\"form-group\" [ngClass]=\"{ 'has-error': f.submitted && !priority.valid }\">\r\n      <label>Priority</label>\r\n      <input type=\"tel\" name=\"priority\" id=\"priority\" class=\"form-control\" [(ngModel)]=\"item.priority\" #priority=\"ngModel\" required />\r\n      <div *ngIf=\"f.submitted && !priority.valid\" class=\"help-block\">Priority is required</div>\r\n    </div>\r\n    <div class=\"form-group\" [ngClass]=\"{ 'has-error': f.submitted && !name.valid }\">\r\n      <label>Name</label>\r\n      <input type=\"text\" name=\"name\" id=\"name\" class=\"form-control\" [(ngModel)]=\"item.name\" #name=\"ngModel\" required />\r\n      <div *ngIf=\"f.submitted && !name.valid\" class=\"help-block\">Name is required</div>\r\n    </div>\r\n    <div class=\"form-group\">\r\n      <label>Color</label>\r\n      <input type=\"text\" name=\"color\" id=\"color\" class=\"form-control\" [(ngModel)]=\"item.color\" #color=\"ngModel\" />\r\n    </div>\r\n    <div class=\"form-group\">\r\n      <label>Size</label>\r\n      <input type=\"text\" name=\"size\" id=\"size\" class=\"form-control\" [(ngModel)]=\"item.size\" #size=\"ngModel\" />\r\n    </div>\r\n    <div class=\"form-group\">\r\n      <label>URL</label>\r\n      <input type=\"url\" name=\"url\" id=\"url\" class=\"form-control\" [(ngModel)]=\"url.size\" #url=\"ngModel\" />\r\n    </div>\r\n    <div class=\"form-group\">\r\n      <label>Notes</label>\r\n      <textarea id=\"notes\" name=\"notes\" [(ngModel)]=\"item.notes\" #notes=\"ngModel\" class=\"form-control\"></textarea>\r\n    </div>\r\n    <div class=\"form-group\">\r\n      <button type=\"submit\" [disabled]=\"loading\" class=\"btn btn-primary\">Add item</button>\r\n    </div>\r\n  </form>\r\n</div>\r\n\r\n"

/***/ }),

/***/ "../../../../../src/app/lists/add-item/add-item.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/lists/add-item/add-item.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/esm5/core.js");
var router_1 = __webpack_require__("../../../router/esm5/router.js");
var authentication_service_1 = __webpack_require__("../../../../../src/app/_services/authentication.service.ts");
var alert_service_1 = __webpack_require__("../../../../../src/app/_services/alert.service.ts");
var lists_service_1 = __webpack_require__("../../../../../src/app/_services/lists.service.ts");
var AddItemComponent = (function () {
    function AddItemComponent(route, router, alertService, authService, listsService) {
        this.route = route;
        this.router = router;
        this.alertService = alertService;
        this.authService = authService;
        this.listsService = listsService;
        this.listId = -1;
        this.loading = false;
        this.item = {};
        this.currentUser = authService.getUser();
        if (this.currentUser == null) {
            this.router.navigate(['/']);
        }
    }
    AddItemComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.listId = parseInt(this.route.snapshot.paramMap.get('id'));
        if (this.listId < 1)
            this.router.navigate(['/home']);
        this.listsService.getList(this.listId.toString())
            .subscribe(function (data) {
            _this.list = data;
            _this.item.listId = _this.listId;
        }, function (error) {
            _this.alertService.error('error: ' + error, false);
        });
    };
    AddItemComponent.prototype.saveitem = function () {
        var _this = this;
        this.loading = true;
        this.listsService.addItem(this.item)
            .subscribe(function (data) {
            _this.alertService.success("Item added!", true);
            _this.router.navigate(['/home']);
        }, function (error) {
            _this.loading = false;
            _this.alertService.error("There was an error: " + error, false);
        });
    };
    AddItemComponent = __decorate([
        core_1.Component({
            selector: 'app-add-item-component',
            template: __webpack_require__("../../../../../src/app/lists/add-item/add-item.component.html"),
            styles: [__webpack_require__("../../../../../src/app/lists/add-item/add-item.component.scss")]
        }),
        __metadata("design:paramtypes", [router_1.ActivatedRoute,
            router_1.Router,
            alert_service_1.AlertService,
            authentication_service_1.AuthenticationService,
            lists_service_1.ListsService])
    ], AddItemComponent);
    return AddItemComponent;
}());
exports.AddItemComponent = AddItemComponent;


/***/ }),

/***/ "../../../../../src/app/lists/edit-list/edit-list.component.html":
/***/ (function(module, exports) {

module.exports = "<div *ngIf=\"list\">\r\n  <h2>{{title}}</h2>\r\n  <form name=\"form\" (ngSubmit)=\"f.form.valid && savelist()\" #f=\"ngForm\" novalidate>\r\n    <input type=\"hidden\" name=\"id\" id=\"id\" [ngModel]=\"list.id\" #id=\"ngModel\" />\r\n    <input type=\"hidden\" name=\"guid\" id=\"guid\" [ngModel]=\"list.guid\" #guid=\"ngModel\" />    \r\n\r\n    <div class=\"form-group\" [ngClass]=\"{ 'has-error': f.submitted && !name.valid }\">\r\n      <label>Name</label>\r\n      <input type=\"text\" name=\"name\" id=\"name\" class=\"form-control\" [(ngModel)]=\"list.name\" #name=\"ngModel\" required />\r\n      <div *ngIf=\"f.submitted && !name.valid\" class=\"help-block\">Name is required</div>\r\n    </div>\r\n    <div class=\"form-group\" [ngClass]=\"{ 'has-error': f.submitted && !slug.valid }\">\r\n      <label>Slug</label>\r\n      <input type=\"text\" name=\"slug\" id=\"slug\" class=\"form-control\" [(ngModel)]=\"list.slug\" #slug=\"ngModel\" required />\r\n      <div *ngIf=\"f.submitted && !slug.valid\" class=\"help-block\">Slug is required</div>\r\n    </div>\r\n    <div class=\"form-group\" [ngClass]=\"{ 'has-error': f.submitted && !priority.valid }\">\r\n      <label>Priority</label>\r\n      <input type=\"tel\" name=\"priority\" id=\"priority\" class=\"form-control\" [(ngModel)]=\"list.priority\" #priority=\"ngModel\" required />\r\n      <div *ngIf=\"f.submitted && !priority.valid\" class=\"help-block\">Priority is required</div>\r\n    </div>\r\n    <div class=\"form-group\">\r\n      <label>Description</label>\r\n      <textarea id=\"description\" name=\"description\" [(ngModel)]=\"list.description\" #description=\"ngModel\" class=\"form-control\"></textarea>\r\n    </div>\r\n    <div class=\"form-group\">\r\n      <button type=\"submit\" [disabled]=\"loading\" class=\"btn btn-primary\">Add item</button>\r\n    </div>\r\n    <div class=\"form-group\">\r\n      <label>Created on</label>\r\n      <span class=\"form-text\">{{list.dateCreated}}</span>\r\n    </div>\r\n    <div class=\"form-group\">\r\n      <label>Last updated on</label>\r\n      <span class=\"form-text\">{{list.dateModified}}</span>\r\n    </div>\r\n  </form>\r\n</div>\r\n"

/***/ }),

/***/ "../../../../../src/app/lists/edit-list/edit-list.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/lists/edit-list/edit-list.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/esm5/core.js");
var router_1 = __webpack_require__("../../../router/esm5/router.js");
var authentication_service_1 = __webpack_require__("../../../../../src/app/_services/authentication.service.ts");
var alert_service_1 = __webpack_require__("../../../../../src/app/_services/alert.service.ts");
var lists_service_1 = __webpack_require__("../../../../../src/app/_services/lists.service.ts");
var EditListComponent = (function () {
    function EditListComponent(route, router, alertService, authService, listsService) {
        this.route = route;
        this.router = router;
        this.alertService = alertService;
        this.authService = authService;
        this.listsService = listsService;
        this.list = {};
        this.id = -1;
        this.loading = false;
        this.currentUser = authService.getUser();
        if (this.currentUser == null) {
            this.router.navigate(['/']);
        }
    }
    EditListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.id = parseInt(this.route.snapshot.paramMap.get('id'));
        if (this.id > 0) {
            this.listsService.getList(this.id.toString()).subscribe(function (data) {
                _this.list = data;
                if (_this.list == null) {
                    _this.router.navigate(['/home']);
                }
            }, function (error) {
                _this.alertService.error('Error: ' + error, false);
            });
        }
    };
    EditListComponent.prototype.savelist = function () {
        var _this = this;
        this.loading = true;
        this.list.owner = this.currentUser;
        this.listsService.saveList(this.list).subscribe(function (data) {
            _this.alertService.success('list updated', true);
            _this.router.navigate(['/home']);
        }, function (error) {
            _this.alertService.error('error: ' + error, false);
        });
    };
    EditListComponent = __decorate([
        core_1.Component({
            selector: 'app-edit-list',
            template: __webpack_require__("../../../../../src/app/lists/edit-list/edit-list.component.html"),
            styles: [__webpack_require__("../../../../../src/app/lists/edit-list/edit-list.component.scss")]
        }),
        __metadata("design:paramtypes", [router_1.ActivatedRoute,
            router_1.Router,
            alert_service_1.AlertService,
            authentication_service_1.AuthenticationService,
            lists_service_1.ListsService])
    ], EditListComponent);
    return EditListComponent;
}());
exports.EditListComponent = EditListComponent;


/***/ }),

/***/ "../../../../../src/app/lists/list/list.component.html":
/***/ (function(module, exports) {

module.exports = "<p>\n  list works!\n</p>\n"

/***/ }),

/***/ "../../../../../src/app/lists/list/list.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/lists/list/list.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/esm5/core.js");
var ListComponent = (function () {
    function ListComponent() {
    }
    ListComponent.prototype.ngOnInit = function () {
    };
    ListComponent = __decorate([
        core_1.Component({
            selector: 'app-list',
            template: __webpack_require__("../../../../../src/app/lists/list/list.component.html"),
            styles: [__webpack_require__("../../../../../src/app/lists/list/list.component.scss")]
        }),
        __metadata("design:paramtypes", [])
    ], ListComponent);
    return ListComponent;
}());
exports.ListComponent = ListComponent;


/***/ }),

/***/ "../../../../../src/app/lists/lists/lists.component.html":
/***/ (function(module, exports) {

module.exports = "<p>\n  lists works!\n</p>\n<router-outlet></router-outlet>\n"

/***/ }),

/***/ "../../../../../src/app/lists/lists/lists.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/lists/lists/lists.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/esm5/core.js");
var ListsComponent = (function () {
    function ListsComponent() {
    }
    ListsComponent.prototype.ngOnInit = function () {
    };
    ListsComponent = __decorate([
        core_1.Component({
            selector: 'app-lists',
            template: __webpack_require__("../../../../../src/app/lists/lists/lists.component.html"),
            styles: [__webpack_require__("../../../../../src/app/lists/lists/lists.component.scss")]
        }),
        __metadata("design:paramtypes", [])
    ], ListsComponent);
    return ListsComponent;
}());
exports.ListsComponent = ListsComponent;


/***/ }),

/***/ "../../../../../src/app/login/login.component.html":
/***/ (function(module, exports) {

module.exports = "<gx-header></gx-header>\r\n\r\n<div id=\"mainPage\">\r\n  <div class=\"container page-content login-container\">\r\n    <div class=\"row justify-content-center\">\r\n      <div class=\"col col-md-3\">\r\n        <div class=\"login-logo-container\">\r\n          <h1 class=\"site-title\">My Gift Xchange</h1>\r\n        </div>\r\n      </div>\r\n      <div class=\"col col-md-5\">\r\n        <div class=\"login-form-container\">\r\n          <form name=\"form\" (ngSubmit)=\"f.form.valid && login()\" #f=\"ngForm\" novalidate>\r\n            <div class=\"form-group\">\r\n              <label for=\"username\">Username</label>\r\n              <input type=\"text\" class=\"form-control\" name=\"username\" [(ngModel)]=\"model.username\" #username=\"ngModel\" required />\r\n              <div *ngIf=\"f.submitted && !username.valid\" class=\"help-block\">Username is required</div>\r\n            </div>\r\n            <div class=\"form-group\">\r\n              <label for=\"password\">Password</label>\r\n              <input type=\"password\" class=\"form-control\" name=\"password\" [(ngModel)]=\"model.password\" #password=\"ngModel\" required />\r\n              <div *ngIf=\"f.submitted && !password.valid\" class=\"help-block\">Password is required</div>\r\n            </div>\r\n            <div class=\"form-group button-container\">\r\n              <button [disabled]=\"loading\" type=\"submit\" class=\"btn btn-primary btn-login\">Login</button>\r\n            </div>\r\n          </form>\r\n          <div class=\"login-social-divider\"><span>or connect with</span></div>\r\n          <div class=\"login-social-buttons\">\r\n            <google-signin></google-signin><facebook-signin></facebook-signin><twitter-login></twitter-login>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n\r\n  <footer-reveal-button></footer-reveal-button>\r\n\r\n  <div class=\"body-bg\"></div>\r\n</div>\r\n\r\n<gx-footer></gx-footer>\r\n\r\n"

/***/ }),

/***/ "../../../../../src/app/login/login.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/login/login.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/esm5/core.js");
var router_1 = __webpack_require__("../../../router/esm5/router.js");
var index_1 = __webpack_require__("../../../../../src/app/_services/index.ts");
var LoginComponent = (function () {
    function LoginComponent(route, router, authenticationService, alertService) {
        this.route = route;
        this.router = router;
        this.authenticationService = authenticationService;
        this.alertService = alertService;
        this.model = {};
        this.loading = false;
        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/home';
        console.log('constructor: ' + this.authenticationService.isLoggedIn());
        if (this.authenticationService.isLoggedIn) {
            this.router.navigate([this.returnUrl]);
        }
    }
    LoginComponent.prototype.ngOnInit = function () {
        // reset login status
        //this.authenticationService.logout();    
    };
    LoginComponent.prototype.login = function () {
        var _this = this;
        this.loading = true;
        this.authenticationService.login(this.model.username, this.model.password)
            .subscribe(function (data) {
            _this.router.navigate([_this.returnUrl]);
        }, function (error) {
            _this.alertService.error('There was an error: ' + error);
            _this.loading = false;
        });
    };
    LoginComponent = __decorate([
        core_1.Component({
            selector: 'app-login',
            template: __webpack_require__("../../../../../src/app/login/login.component.html"),
            styles: [__webpack_require__("../../../../../src/app/login/login.component.scss")]
        }),
        __metadata("design:paramtypes", [router_1.ActivatedRoute,
            router_1.Router,
            index_1.AuthenticationService,
            index_1.AlertService])
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;


/***/ }),

/***/ "../../../../../src/app/privacy/privacy.component.html":
/***/ (function(module, exports) {

module.exports = "<h2>Privacy Policy</h2><p>Gift XChange operates the https://giftxchange.azurewebsites.net/ website, which provides the SERVICE.</p><p>This page is used to inform website visitors regarding our policies with the collection, use, and disclosure of Personal Information if anyone decided to use our Service.</p><p>If you choose to use our Service, then you agree to the collection and use of information in relation with this policy. The Personal Information that we collect are used for providing and improving the Service. We will not use or share your information with anyone except as described in this Privacy Policy.</p><p>The terms used in this Privacy Policy have the same meanings as in our Terms and Conditions, which is accessible at https://giftxchange.azurewebsites.net/ , unless otherwise defined in this Privacy Policy.</p><p><strong>Information Collection and Use</strong></p><p>For a better experience while using our Service, we may require you to provide us with certain personally identifiable information, including but not limited to your name, phone number, and postal address. The information that we collect will be used to contact or identify you.</p><p><strong>Log Data</strong></p><p>We want to inform you that whenever you visit our Service, we collect information that your browser sends to us that is called Log Data. This Log Data may include information such as your computer’s Internet Protocol (“IP”) address, browser version, pages of our Service that you visit, the time and date of your visit, the time spent on those pages, and other statistics.</p><p><strong>Cookies</strong></p><p>Cookies are files with small amount of data that is commonly used an anonymous unique identifier. These are sent to your browser from the website that you visit and are stored on your computer’s hard drive.</p><p>Our website uses these “cookies” to collection information and to improve our Service. You have the option to either accept or refuse these cookies, and know when a cookie is being sent to your computer. If you choose to refuse our cookies, you may not be able to use some portions of our Service.</p><p><strong>Service Providers</strong></p><p>We may employ third-party companies and individuals due to the following reasons:</p><ul><li class=\"first-child\">To facilitate our Service;</li><li>To provide the Service on our behalf;</li><li>To perform Service-related services; or</li><li class=\"last-child\">To assist us in analyzing how our Service is used.</li></ul><p>We want to inform our Service users that these third parties have access to your Personal Information. The reason is to perform the tasks assigned to them on our behalf. However, they are obligated not to disclose or use the information for any other purpose.</p><p><strong>Security</strong></p><p>We value your trust in providing us your Personal Information, thus we are striving to use commercially acceptable means of protecting it. But remember that no method of transmission over the internet, or method of electronic storage is 100% secure and reliable, and we cannot guarantee its absolute security.</p><p><strong>Links to Other Sites</strong></p><p>Our Service may contain links to other sites. If you click on a third-party link, you will be directed to that site. Note that these external sites are not operated by us. Therefore, we strongly advise you to review the Privacy Policy of these websites, <a href=\"http://promocode.com.ph/grabtaxi/\" target=\"_blank\">get more info</a>. We have no control over, and assume no responsibility for the content, privacy policies, or practices of any third-party sites or services.</p><p><strong>Children’s Privacy</strong></p><p>Our Services do not address anyone under the age of 13. We do not knowingly collect personal identifiable information from children under 13. In the case we discover that a child under 13 has provided us with personal information, we immediately delete this from our servers. If you are a parent or guardian and you are aware that your child has provided us with personal information, please contact us so that we will be able to do necessary actions.</p><p><strong>Changes to This Privacy Policy</strong></p><p>We may update our Privacy Policy from time to time. Thus, we advise you to review this page periodically for any changes. We will notify you of any changes by posting the new Privacy Policy on this page. These changes are effective immediately, after they are posted on this page.</p><p><strong>Contact Us</strong></p><p>If you have any questions or suggestions about our Privacy Policy, do not hesitate to contact us.</p><p>This Privacy Policy page was created at <a href=\"https://privacypolicytemplate.net\" target=\"_blank\">privacypolicytemplate.net</a>.</p>\r\n"

/***/ }),

/***/ "../../../../../src/app/privacy/privacy.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/privacy/privacy.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/esm5/core.js");
var PrivacyComponent = (function () {
    function PrivacyComponent() {
    }
    PrivacyComponent.prototype.ngOnInit = function () {
    };
    PrivacyComponent = __decorate([
        core_1.Component({
            selector: 'app-privacy',
            template: __webpack_require__("../../../../../src/app/privacy/privacy.component.html"),
            styles: [__webpack_require__("../../../../../src/app/privacy/privacy.component.scss")]
        }),
        __metadata("design:paramtypes", [])
    ], PrivacyComponent);
    return PrivacyComponent;
}());
exports.PrivacyComponent = PrivacyComponent;


/***/ }),

/***/ "../../../../../src/app/profile-pic/profile-pic.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"file-upload\"> \r\n  <input id=\"custom-input\" type=\"file\" (change)=\"fileChangeListener($event)\">\r\n</div>\r\n<img-cropper #cropper [image]=\"data\" [settings]=\"cropperSettings\"></img-cropper>\r\n<button type=\"button\" class=\"btn btn-primary btn-sm\" (click)=\"savePic()\">Save</button>\r\n<!--<br>\r\n<span class=\"result rounded\" *ngIf=\"data.image\">\r\n  <img [src]=\"data.image\" [width]=\"cropperSettings.croppedWidth\" [height]=\"cropperSettings.croppedHeight\">\r\n</span>-->\r\n"

/***/ }),

/***/ "../../../../../src/app/profile-pic/profile-pic.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/profile-pic/profile-pic.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/esm5/core.js");
var ng2_img_cropper_1 = __webpack_require__("../../../../ng2-img-cropper/index.js");
var ProfilePicComponent = (function () {
    function ProfilePicComponent() {
        this.picurl = '';
        //this.cropperSettings = new CropperSettings();
        //this.cropperSettings.width = 100;
        //this.cropperSettings.height = 100;
        //this.cropperSettings.croppedWidth = 100;
        //this.cropperSettings.croppedHeight = 100;
        //this.cropperSettings.canvasWidth = 400;
        //this.cropperSettings.canvasHeight = 300;
        this.cropperSettings = new ng2_img_cropper_1.CropperSettings();
        this.cropperSettings.noFileInput = true;
        this.cropperSettings.canvasWidth = 160;
        this.cropperSettings.canvasHeight = 160;
        this.data = {};
    }
    ProfilePicComponent.prototype.ngOnInit = function () {
        console.log('this.picUrl: ' + this.picurl);
        var image = new Image();
        var that = this;
        fetch(this.picurl)
            .then(function (res) { return res.blob(); }) // Gets the response and returns it as a blob
            .then(function (blob) {
            // Here's where you get access to the blob
            // And you can use it for whatever you want
            // Like calling ref().put(blob)
            // Here, I use it to make an image appear on the page
            //let objectURL = URL.createObjectURL(blob);
            //let myImage = new Image();
            //myImage.src = objectURL;
            var myReader = new FileReader();
            myReader.onloadend = function (loadEvent) {
                image.src = loadEvent.target.result;
                that.cropper.setImage(image);
            };
            myReader.readAsDataURL(blob);
            //document.getElementById('myImg').appendChild(myImage)
        });
    };
    ProfilePicComponent.prototype.savePic = function () {
        console.log('saving: ' + JSON.stringify(this.cropper.image));
        console.log('saving: ' + this.cropper.image.image);
    };
    ProfilePicComponent.prototype.fileChangeListener = function ($event) {
        var image = new Image();
        var file = $event.target.files[0];
        var myReader = new FileReader();
        var that = this;
        myReader.onloadend = function (loadEvent) {
            image.src = loadEvent.target.result;
            that.cropper.setImage(image);
        };
        myReader.readAsDataURL(file);
    };
    __decorate([
        core_1.ViewChild('cropper', undefined),
        __metadata("design:type", ng2_img_cropper_1.ImageCropperComponent)
    ], ProfilePicComponent.prototype, "cropper", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], ProfilePicComponent.prototype, "picurl", void 0);
    ProfilePicComponent = __decorate([
        core_1.Component({
            selector: 'gx-profile-pic',
            template: __webpack_require__("../../../../../src/app/profile-pic/profile-pic.component.html"),
            styles: [__webpack_require__("../../../../../src/app/profile-pic/profile-pic.component.scss")]
        }),
        __metadata("design:paramtypes", [])
    ], ProfilePicComponent);
    return ProfilePicComponent;
}());
exports.ProfilePicComponent = ProfilePicComponent;


/***/ }),

/***/ "../../../../../src/app/register/register.component.html":
/***/ (function(module, exports) {

module.exports = "<gx-header></gx-header>\r\n\r\n<div id=\"mainPage\">\r\n\r\n  <div class=\"page-container\" id=\"registerPage\">\r\n\r\n    <h2>Sign up for a account. It's free!</h2>\r\n\r\n    <form name=\"form\" (ngSubmit)=\"f.form.valid && register()\" #f=\"ngForm\" novalidate>\r\n      <div class=\"form-group\" [ngClass]=\"{ 'has-error': f.submitted && !email.valid }\">\r\n        <label for=\"email\">Your email address</label>\r\n        <input type=\"email\" class=\"form-control\" name=\"email\" [(ngModel)]=\"model.email\" #email=\"ngModel\" required />\r\n        <div *ngIf=\"f.submitted && !email.valid\" class=\"help-block\">Email is required</div>\r\n      </div>\r\n      <h4>Create a password to login</h4>\r\n      <div class=\"form-group\" [ngClass]=\"{ 'has-error': f.submitted && !password.valid }\">\r\n        <label for=\"password\">Password</label>\r\n        <input type=\"password\" class=\"form-control\" name=\"password\" [(ngModel)]=\"model.password\" #password=\"ngModel\" required />\r\n        <div *ngIf=\"f.submitted && !password.valid\" class=\"help-block\">Password is required</div>\r\n      </div>\r\n      <div class=\"form-group\" [ngClass]=\"{ 'has-error': f.submitted && !confirmPassword.valid && confirmPassword == password }\">\r\n        <label for=\"confirmPassword\">Re-type Password</label>\r\n        <input type=\"password\" class=\"form-control\" name=\"confirmPassword\" [(ngModel)]=\"model.confirmPassword\" #confirmPassword=\"ngModel\" required />\r\n        <div *ngIf=\"f.submitted && !password.valid\" class=\"help-block\">Password is required</div>\r\n        <div *ngIf=\"f.submitted && confirmPassword != password\">Password does not match</div>\r\n      </div>\r\n      <h4>Now tell us a little about yourself.</h4>\r\n      <div class=\"form-group\" [ngClass]=\"{ 'has-error': f.submitted && !firstName.valid }\">\r\n        <label for=\"firstName\">Youe first name</label>\r\n        <input type=\"text\" class=\"form-control\" name=\"firstName\" [(ngModel)]=\"model.firstName\" #firstName=\"ngModel\" required />\r\n        <div *ngIf=\"f.submitted && !firstName.valid\" class=\"help-block\">First name is required</div>\r\n      </div>\r\n      <div class=\"form-group\" [ngClass]=\"{ 'has-error': f.submitted && !lastName.valid }\">\r\n        <label for=\"lastName\">Youe last name</label>\r\n        <input type=\"text\" class=\"form-control\" name=\"lastName\" [(ngModel)]=\"model.lastName\" #lastName=\"ngModel\" required />\r\n        <div *ngIf=\"f.submitted && !lastName.valid\" class=\"help-block\">Last name is required</div>\r\n      </div>\r\n      <div class=\"form-group\" [ngClass]=\"{ 'has-error': f.submitted && !gender.valid }\">\r\n        <label for=\"gender\">Your gender ... <small>(as stated on your birth certificate)</small></label>\r\n        <div class=\"btn-group btn-group-toggle\" data-toggle=\"buttons\">\r\n          <label class=\"btn btn-secondary\">\r\n            <input type=\"radio\" name=\"gender\" value=\"m\" [(ngModel)]=\"model.gender\" #gender=\"ngModel\" /> Male\r\n          </label>\r\n          <label class=\"btn btn-secondary\">\r\n            <input type=\"radio\" name=\"gender\" value=\"m\" [(ngModel)]=\"model.gender\" #gender=\"ngModel\" /> Female\r\n          </label>\r\n        </div>\r\n        <div *ngIf=\"f.submitted && (gender == 'm' || gender == 'f')\" class=\"help-block\">Gender is required</div>\r\n      </div>\r\n      <div class=\"form-group\">\r\n        <button [disabled]=\"loading\" class=\"btn btn-primary\">Register</button>\r\n        <img *ngIf=\"loading\" src=\"data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==\" />\r\n      </div>\r\n    </form>\r\n  </div>\r\n\r\n  <footer-reveal-button></footer-reveal-button>\r\n\r\n  <div class=\"body-bg\"></div>\r\n</div>\r\n\r\n<gx-footer></gx-footer>\r\n\r\n\r\n"

/***/ }),

/***/ "../../../../../src/app/register/register.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/register/register.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/esm5/core.js");
var router_1 = __webpack_require__("../../../router/esm5/router.js");
var alert_service_1 = __webpack_require__("../../../../../src/app/_services/alert.service.ts");
var authentication_service_1 = __webpack_require__("../../../../../src/app/_services/authentication.service.ts");
var user_service_1 = __webpack_require__("../../../../../src/app/_services/user.service.ts");
var RegisterComponent = (function () {
    function RegisterComponent(route, router, authenticationService, userService, alertService) {
        this.route = route;
        this.router = router;
        this.authenticationService = authenticationService;
        this.userService = userService;
        this.alertService = alertService;
        this.model = {};
        this.loading = false;
    }
    RegisterComponent.prototype.ngOnInit = function () {
        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
        if (this.authenticationService.isLoggedIn())
            this.router.navigate([this.returnUrl]);
    };
    RegisterComponent.prototype.register = function () {
        var _this = this;
        this.loading = true;
        this.userService.register(this.model.email, this.model.password, this.model.confirmPassword, this.model.firstName, this.model.lastName, this.model.gender)
            .subscribe(function (data) {
            //this.router.navigate([this.returnUrl]);
            _this.alertService.success("Your account has been created. You may now log in.", true);
            _this.router.navigate(['/login']);
        }, function (error) {
            _this.loading = false;
            _this.alertService.error("There was an error: " + error, false);
        });
    };
    RegisterComponent = __decorate([
        core_1.Component({
            selector: 'app-register',
            template: __webpack_require__("../../../../../src/app/register/register.component.html"),
            styles: [__webpack_require__("../../../../../src/app/register/register.component.scss")]
        }),
        __metadata("design:paramtypes", [router_1.ActivatedRoute,
            router_1.Router,
            authentication_service_1.AuthenticationService,
            user_service_1.UserService,
            alert_service_1.AlertService])
    ], RegisterComponent);
    return RegisterComponent;
}());
exports.RegisterComponent = RegisterComponent;


/***/ }),

/***/ "../../../../../src/app/terms-of-service/terms-of-service.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"example-text\">\r\n  <h4>Terms of Service Template</h4>\r\n  <p>Please read these terms of service (\"terms\", \"terms of service\") carefully before using [website] website (the \"service\") operated by [name] (\"us\", 'we\", \"our\").</p>\r\n  <p><strong>Conditions of Use</strong></p>\r\n  <p>We will provide their services to you, which are subject to the conditions stated below in this document. Every time you visit this website, use its services or make a purchase, you accept the following conditions. This is why we urge you to read them carefully.</p>\r\n  <p><strong>Privacy Policy</strong></p>\r\n  <p>Before you continue using our website we advise you to read our privacy policy [link to privacy policy] regarding our user data collection. It will help you better understand our practices.</p>\r\n  <p><strong>Copyright</strong></p>\r\n  <p>Content published on this website (digital downloads, images, texts, graphics, logos) is the property of [name] and/or its content creators and protected by international copyright laws. The entire compilation of the content found on this website is the exclusive property of [name], with copyright authorship for this compilation by [name].</p>\r\n  <p><strong>Communications</strong></p>\r\n  <p>The entire communication with us is electronic. Every time you send us an email or visit our website, you are going to be communicating with us. You hereby consent to receive communications from us. If you subscribe to the news on our website, you are going to receive regular emails from us. We will continue to communicate with you by posting news and notices on our website and by sending you emails. You also agree that all notices, disclosures, agreements and other communications we provide to you electronically meet the legal requirements that such communications be in writing.</p>\r\n  <p><strong>Applicable Law</strong></p>\r\n  <p>By visiting this website, you agree that the laws of the [your location], without regard to principles of conflict laws, will govern these terms of service, or any dispute of any sort that might come between [name] and you, or its business partners and associates.</p>\r\n  <p><strong>Disputes</strong></p>\r\n  <p>Any dispute related in any way to your visit to this website or to products you purchase from us shall be arbitrated by state or federal court [your location] and you consent to exclusive jurisdiction and venue of such courts.</p>\r\n  <p><strong>Comments, Reviews, and Emails</strong></p>\r\n  <p>Visitors may post content as long as it is not obscene, illegal, defamatory, threatening, infringing of intellectual property rights, invasive of privacy or injurious in any other way to third parties. Content has to be free of software viruses, political campaign, and commercial solicitation.</p>\r\n  <p>We reserve all rights (but not the obligation) to remove and/or edit such content. When you post your content, you grant [name] non-exclusive, royalty-free and irrevocable right to use, reproduce, publish, modify such content throughout the world in any media.</p>\r\n  <p><strong>License and Site Access</strong></p>\r\n  <p>We grant you a limited license to access and make personal use of this website. You are not allowed to download or modify it. This may be done only with written consent from us.</p><p><strong>User Account</strong></p>\r\n  <p>If you are an owner of an account on this website, you are solely responsible for maintaining the confidentiality of your private user details (username and password). You are responsible for all activities that occur under your account or password.</p>\r\n  <p>We reserve all rights to terminate accounts, edit or remove content and cancel orders in their sole discretion.</p>\r\n</div>\r\n"

/***/ }),

/***/ "../../../../../src/app/terms-of-service/terms-of-service.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/terms-of-service/terms-of-service.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/esm5/core.js");
var TermsOfServiceComponent = (function () {
    function TermsOfServiceComponent() {
    }
    TermsOfServiceComponent.prototype.ngOnInit = function () {
    };
    TermsOfServiceComponent = __decorate([
        core_1.Component({
            selector: 'app-terms-of-service',
            template: __webpack_require__("../../../../../src/app/terms-of-service/terms-of-service.component.html"),
            styles: [__webpack_require__("../../../../../src/app/terms-of-service/terms-of-service.component.scss")]
        }),
        __metadata("design:paramtypes", [])
    ], TermsOfServiceComponent);
    return TermsOfServiceComponent;
}());
exports.TermsOfServiceComponent = TermsOfServiceComponent;


/***/ }),

/***/ "../../../../../src/app/twitter-auth/twitter-auth.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"text-center\"><i class=\"fa-3x fas fa-spinner fa-pulse\"></i></div>\n"

/***/ }),

/***/ "../../../../../src/app/twitter-auth/twitter-auth.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/twitter-auth/twitter-auth.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/esm5/core.js");
var authentication_service_1 = __webpack_require__("../../../../../src/app/_services/authentication.service.ts");
var alert_service_1 = __webpack_require__("../../../../../src/app/_services/alert.service.ts");
var http_1 = __webpack_require__("../../../http/esm5/http.js");
var router_1 = __webpack_require__("../../../router/esm5/router.js");
var TwitterAuthComponent = (function () {
    function TwitterAuthComponent(route, alertService, router, http, authService) {
        var _this = this;
        this.route = route;
        this.alertService = alertService;
        this.router = router;
        this.http = http;
        this.authService = authService;
        this.returnUrl = '';
        this.authToken = '';
        this.authVerifier = '';
        this.authSecret = '';
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/home';
        this.authToken = this.getParameterByName('oauth_token', window.location.href);
        this.authVerifier = this.getParameterByName('oauth_verifier', window.location.href);
        this.authSecret = '';
        if (this.authToken != '' && this.authVerifier != null) {
            this.authService.twitterAccessToken(this.authToken, this.authVerifier).
                subscribe(function (data) {
                //console.log('success! ' + data);
                if (data == true) {
                    window.opener.document.location.href = _this.returnUrl;
                    window.close();
                }
            }, function (error) {
                _this.alertService.error('there was an error logging in: ' + error);
            });
        }
        //if (this.authToken != '') {
        //  this.authService.twitterLogin(this.authToken)
        //    .subscribe(
        //    data => {
        //      if (data == true) {
        //        window.opener.document.location.href = this.returnUrl;
        //        //window.parent.focus();
        //        window.close();
        //      }
        //    },
        //    error => {
        //      this.alertService.error('There was an error: ' + error, false);
        //    }
        //    );
        //}
    }
    TwitterAuthComponent.prototype.getParameterByName = function (name, url) {
        name = name.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&#]" + name + "(=([^&#]*)|&|#|$)"), results = regex.exec(url);
        if (!results)
            return null;
        if (!results[2])
            return '';
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    };
    TwitterAuthComponent.prototype.ngOnInit = function () {
    };
    TwitterAuthComponent = __decorate([
        core_1.Component({
            selector: 'app-twitter-auth',
            template: __webpack_require__("../../../../../src/app/twitter-auth/twitter-auth.component.html"),
            styles: [__webpack_require__("../../../../../src/app/twitter-auth/twitter-auth.component.scss")]
        }),
        __metadata("design:paramtypes", [router_1.ActivatedRoute, alert_service_1.AlertService, router_1.Router, http_1.Http,
            authentication_service_1.AuthenticationService])
    ], TwitterAuthComponent);
    return TwitterAuthComponent;
}());
exports.TwitterAuthComponent = TwitterAuthComponent;


/***/ }),

/***/ "../../../../../src/app/twitter-login-response/twitter-login-response.component.html":
/***/ (function(module, exports) {

module.exports = "<button type=\"button\" (click)=\"openLogin()\" class=\"btn btn-primary btn-social align-middle\" *ngIf=\"token != ''\"><i class=\"fab fa-twitter\"></i></button>\r\n\r\n"

/***/ }),

/***/ "../../../../../src/app/twitter-login-response/twitter-login-response.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/twitter-login-response/twitter-login-response.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/esm5/core.js");
var authentication_service_1 = __webpack_require__("../../../../../src/app/_services/authentication.service.ts");
var alert_service_1 = __webpack_require__("../../../../../src/app/_services/alert.service.ts");
var app_config_1 = __webpack_require__("../../../../../src/app/app.config.ts");
var TwitterLoginResponseComponent = (function () {
    function TwitterLoginResponseComponent(authService, alertService, appConfig) {
        this.authService = authService;
        this.alertService = alertService;
        this.appConfig = appConfig;
        this.token = '';
        this.tokenSecret = '';
        this.siteUrl = '';
        this.siteUrl = this.appConfig.urlRoot();
    }
    TwitterLoginResponseComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.authService.twitterLoginSetup()
            .subscribe(function (data) {
            _this.token = _this.authService.getTwitterRequestToken();
            _this.tokenSecret = _this.authService.getTwitterTokenSecret();
        }, function (error) {
            _this.alertService.error('there was an error: ' + error, false);
        });
    };
    TwitterLoginResponseComponent.prototype.openLogin = function () {
        this.authWindow = window.open('https://api.twitter.com/oauth/authenticate?oauth_token=' + this.token + '&callback_url=' + this.siteUrl + '/twitter-auth', null, 'width=600,height=400');
    };
    TwitterLoginResponseComponent = __decorate([
        core_1.Component({
            selector: 'twitter-login',
            template: __webpack_require__("../../../../../src/app/twitter-login-response/twitter-login-response.component.html"),
            styles: [__webpack_require__("../../../../../src/app/twitter-login-response/twitter-login-response.component.scss")]
        }),
        __metadata("design:paramtypes", [authentication_service_1.AuthenticationService, alert_service_1.AlertService, app_config_1.AppConfig])
    ], TwitterLoginResponseComponent);
    return TwitterLoginResponseComponent;
}());
exports.TwitterLoginResponseComponent = TwitterLoginResponseComponent;


/***/ }),

/***/ "../../../../../src/environments/environment.prod.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.environment = {
    production: true
};


/***/ }),

/***/ "../../../../../src/main.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/esm5/core.js");
var platform_browser_dynamic_1 = __webpack_require__("../../../platform-browser-dynamic/esm5/platform-browser-dynamic.js");
var app_module_1 = __webpack_require__("../../../../../src/app/app.module.ts");
var environment_prod_1 = __webpack_require__("../../../../../src/environments/environment.prod.ts");
if (environment_prod_1.environment.production) {
    core_1.enableProdMode();
}
platform_browser_dynamic_1.platformBrowserDynamic().bootstrapModule(app_module_1.AppModule)
    .catch(function (err) { return console.log(err); });


/***/ }),

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("../../../../../src/main.ts");


/***/ })

},[0]);
//# sourceMappingURL=main.bundle.js.map