import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Page } from 'tns-core-modules/ui/page';

import { UserService } from '../../services/user.service';
import { AbstractUserListComponent } from './abstract-user-list.component';

@Component({
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent extends AbstractUserListComponent {

  constructor(userService: UserService,
              router: Router,
              private page: Page) {
    super(userService, router);
    page.actionBarHidden = true;
  }

  // TODO unit test
  addUser(event: any): void {
    this.router.navigate(['/users/new']);
  }
}
