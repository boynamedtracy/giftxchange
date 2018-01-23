import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

import { FormsModule } from '@angular/forms';
import { HttpModule, XHRBackend } from '@angular/http';

import { routing } from './app.routing';

import { AlertComponent } from './_directives/alert.component';
import { AlertService, AuthenticationService, UserService } from './_services/index';

import { AuthGuard } from './_guards/auth.guard';
import { AppConfig } from './app.config';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ConfirmEmailComponent } from './confirm-email/confirm-email.component';
import { GoogleSigninComponent } from './google-signin/google-signin.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { FacebookSigninComponent } from './facebook-signin/facebook-signin.component';
import { FacebookLoginResponseComponent } from './facebook-login-response/facebook-login-response.component';
import { TwitterLoginResponseComponent } from './twitter-login-response/twitter-login-response.component';
import { TwitterAuthComponent } from './twitter-auth/twitter-auth.component';
import { TermsOfServiceComponent } from './terms-of-service/terms-of-service.component';
import { HeaderComponent } from './_shared/header/header.component';
import { FooterComponent } from './_shared/footer.component';
import { FooterRevealButtonComponent } from './_shared/footer-reveal-button.component';
import { GroupsService } from './_services/groups.service';
import { GroupEditComponent } from './groups/group-edit.component';
import { GroupDetailsComponent } from './groups/group-details.component';
import { ListsService } from './_services/lists.service';
import { AddItemComponent } from './lists/add-item/add-item.component';
import { EditListComponent } from './lists/edit-list/edit-list.component';
import { ListsComponent } from './lists/lists/lists.component';
import { ListComponent } from './lists/list/list.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AlertComponent,
    LoginComponent,
    RegisterComponent,
    ConfirmEmailComponent,
    GoogleSigninComponent,
    PrivacyComponent,
    FacebookSigninComponent,
    FacebookLoginResponseComponent,
    TwitterLoginResponseComponent,
    TwitterAuthComponent,
    TermsOfServiceComponent,
    HeaderComponent,
    FooterRevealButtonComponent,
    FooterComponent,
    GroupEditComponent,
    GroupDetailsComponent,
    AddItemComponent,
    EditListComponent,
    ListsComponent,
    ListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing
  ],
  providers: [
    AppConfig,
    AlertService,
    AuthGuard,
    AuthenticationService,
    GroupsService,
    ListsService,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
