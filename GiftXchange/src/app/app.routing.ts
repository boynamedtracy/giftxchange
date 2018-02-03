import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ConfirmEmailComponent } from './confirm-email/confirm-email.component';

import { GoogleSigninComponent } from './google-signin/google-signin.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { FacebookLoginResponseComponent } from './facebook-login-response/facebook-login-response.component';
import { TwitterLoginResponseComponent } from './twitter-login-response/twitter-login-response.component';
import { TwitterAuthComponent } from './twitter-auth/twitter-auth.component';
import { TermsOfServiceComponent } from './terms-of-service/terms-of-service.component';
import { AuthGuard } from './_guards/auth.guard';
import { GroupEditComponent } from './groups/group-edit/group-edit.component';
import { GroupDetailsComponent } from './groups/group-details/group-details.component';
import { ListsComponent } from './lists/lists.component';
import { EditListComponent } from './lists/edit-list/edit-list.component';
import { ListComponent } from './lists/list/list.component';
import { AddItemComponent } from './lists/add-item/add-item.component';
import { GroupsComponent } from './groups/groups.component';
import { SendInviteComponent } from './groups/send-invite/send-invite.component';
import { AcceptInviteComponent } from './groups/accept-invite/accept-invite.component';
import { AccountComponent } from './account/account.component';
import { MyProfileComponent } from './account/my-profile/my-profile.component';
import { EditExchangeComponent } from './groups/edit-exchange/edit-exchange.component';
import { ExchangeDetailsComponent } from './groups/exchange-details/exchange-details.component';

const appRoutes: Routes = [
  { path: '', component: LoginComponent },
  {
    path: 'account', component: AccountComponent, canActivate: [AuthGuard],
    children: [
      { path: 'my-profile', component: MyProfileComponent }
    ]
  },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'register', component: RegisterComponent },
  { path: 'gauth', component: GoogleSigninComponent },
  { path: 'group/:id', component: GroupDetailsComponent, canActivate: [AuthGuard] },
  {
    path: 'lists', component: ListsComponent, canActivate: [AuthGuard],
    children: [
      { path: 'add-item/:id', component: AddItemComponent },
      { path: 'edit/:id', component: EditListComponent },
      { path: 'list/:id', component: ListComponent },
    ]
  },
  { path: 'confirm-email', component: ConfirmEmailComponent },
  { path: 'privacy', component: PrivacyComponent },
  { path: 'facebook-login', component: FacebookLoginResponseComponent },
  { path: 'twitter-login', component: TwitterLoginResponseComponent },
  { path: 'signin-twitter', component: TwitterAuthComponent },
  { path: 'terms', component: TermsOfServiceComponent },
  {
    path: 'groups', component: GroupsComponent, canActivate: [AuthGuard],
    children: [
      { path: 'send-invite/:id', component: SendInviteComponent },
      { path: 'edit/:id', component: GroupEditComponent },
      { path: 'accept-invite/:guid', component: AcceptInviteComponent },
      { path: 'exchange/:id', component: ExchangeDetailsComponent },
      { path: 'edit-exchange/:groupId/:id', component: EditExchangeComponent }
    ]
  },
  { path: '**', redirectTo: '' }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
