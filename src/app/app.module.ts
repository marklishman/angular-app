import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './main/app.component';
import { UserListComponent } from './user/containers/user-list/user-list.component';
import { UserViewComponent } from './user/containers/user-view/user-view.component';
import { UserEditComponent } from './user/containers/user-edit/user-edit.component';
import { UserHttpService } from './user/http/user-http.service';
import { UserService } from './user/services/user.service';

// TODO common values using spread

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
