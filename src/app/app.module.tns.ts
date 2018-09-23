import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptModule } from 'nativescript-angular/nativescript.module';

import { AppRoutingModule } from './app-routing.module.tns';
import { AppComponent } from './main/app.component';
import { UserListComponent } from './user/containers/user-list/user-list.component';
import { UserEditComponent } from './user/containers/user-edit/user-edit.component';
import { UserViewComponent } from './user/containers/user-view/user-view.component';
import { NativeScriptHttpClientModule } from 'nativescript-angular/http-client';
import { UserHttpService } from './user/http/user-http.service';
import { UserService } from './user/services/user.service';

@NgModule({
  declarations: [
    AppComponent,
    UserListComponent,
    UserViewComponent,
    UserEditComponent,
  ],
  imports: [
    NativeScriptModule,
    AppRoutingModule,
    NativeScriptHttpClientModule,
  ],
  providers: [
    UserHttpService,
    UserService
  ],
  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA]
})
export class AppModule { }
