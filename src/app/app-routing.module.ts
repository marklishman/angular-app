import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserListComponent } from './user/containers/user-list/user-list.component';
import { UserViewComponent } from './user/components/user-view/user-view.component';
import { UserEditComponent } from './user/components/user-edit/user-edit.component';

const routes: Routes = [
  {path: '', redirectTo: '/users', pathMatch: 'full'},
  {path: 'users/:userId/edit', component: UserEditComponent},
  {path: 'users/new', component: UserEditComponent},
  {path: 'users/:userId', component: UserViewComponent},
  {path: 'users', component: UserListComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
