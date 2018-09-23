import { NgModule } from '@angular/core';
import { NativeScriptRouterModule } from 'nativescript-angular/router';
import { Routes } from '@angular/router';
import { UserListComponent } from './user/containers/user-list/user-list.component';

const routes: Routes = [
  {path: '', redirectTo: '/users', pathMatch: 'full'},
  {path: 'users', component: UserListComponent},
];

@NgModule({
  imports: [NativeScriptRouterModule.forRoot(routes)],
  exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
