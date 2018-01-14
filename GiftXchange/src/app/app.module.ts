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


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AlertComponent,
    LoginComponent,
    RegisterComponent,
    ConfirmEmailComponent
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
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
