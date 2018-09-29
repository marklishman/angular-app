import { Component } from '@angular/core';

import { AbstractUserListComponent } from './abstract-user-list.component';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent extends AbstractUserListComponent {

  constructor(userService: UserService,
              router: Router) {
    super(userService, router);
  }
}
