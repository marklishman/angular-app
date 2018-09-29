import { NgModule } from '@angular/core';
import { NativeScriptRouterModule } from 'nativescript-angular/router';
import { Routes } from '@angular/router';
import { UserListComponent } from './user/containers/user-list/user-list.component';
import { UserViewComponent } from './user/containers/user-view/user-view.component';
import { UserEditComponent } from './user/containers/user-edit/user-edit.component';

const routes: Routes = [
  {path: '', redirectTo: '/users', pathMatch: 'full'},
  {path: 'users', component: UserListComponent},
  {path: 'users/:userId/edit', component: UserEditComponent},
  {path: 'users/new', component: UserEditComponent},
  {path: 'users/:userId', component: UserViewComponent},
  {path: 'users', component: UserListComponent},
];

@NgModule({
  imports: [NativeScriptRouterModule.forRoot(routes)],
  exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
