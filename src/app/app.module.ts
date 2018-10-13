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
import { WebPlatformFeatures } from './common/platform/WebPlatformFeatures';
import { PLATFORM_FEATURES } from './app.module.shared';
import { FloatingButtonComponent } from './common/components/floating-button/floating-button.component';

// TODO fab here?

@NgModule({
  declarations: [
    AppComponent,
    UserListComponent,
    UserViewComponent,
    UserEditComponent,
    FloatingButtonComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    UserHttpService,
    UserService,
    {
      provide: PLATFORM_FEATURES,
      useClass: WebPlatformFeatures
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
