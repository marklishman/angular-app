import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NativeScriptModule } from 'nativescript-angular/nativescript.module';
import { NativeScriptFormsModule } from 'nativescript-angular';
import { UserHttpService } from './user/http/user-http.service';
import { NativeScriptHttpClientModule } from 'nativescript-angular/http-client';

import { AppRoutingModule } from './app-routing.module.tns';
import { AppComponent } from './main/app.component';
import { UserListComponent } from './user/containers/user-list/user-list.component';
import { UserEditComponent } from './user/containers/user-edit/user-edit.component';
import { UserViewComponent } from './user/containers/user-view/user-view.component';
import { UserService } from './user/services/user.service';
import { MobilePlatformFeatures } from './common/platform/MobilePlatformFeatures';
import { PLATFORM_FEATURES } from './app.module.shared';

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
    NativeScriptFormsModule,
    ReactiveFormsModule
  ],
  providers: [
    UserHttpService,
    UserService,
    {
      provide: PLATFORM_FEATURES,
      useClass: MobilePlatformFeatures
    }
  ],
  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA]
})
export class AppModule { }
