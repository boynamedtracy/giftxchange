import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

import { FormsModule } from '@angular/forms';
import { HttpModule, XHRBackend } from '@angular/http';

import { routing } from './app.routing';

import { AlertComponent } from './_directives/alert.component';
import { AlertService } from './_services/index';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AlertComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing
  ],
  providers: [
    AlertService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
