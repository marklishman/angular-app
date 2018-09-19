import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './main/app.component';
import { UserListComponent } from './user/containers/user-list/user-list.component';
import { UserViewComponent } from './user/containers/user-view/user-view.component';
import { UserEditComponent } from './user/containers/user-edit/user-edit.component';
import { HttpClientModule } from '@angular/common/http';
import { UserHttpService } from './user/http/user-http.service';
import { ReactiveFormsModule } from '@angular/forms';
import { UserService } from './user/services/user.service';

@NgModule({
  declarations: [
    AppComponent,
    UserListComponent,
    UserViewComponent,
    UserEditComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    UserHttpService,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
