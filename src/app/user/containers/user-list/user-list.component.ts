import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AbstractUserListComponent } from './abstract-user-list.component';
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

  onDelete(id: number): void {
    if (confirm('Are you sure?')) {
      this.userService.deleteUser$(id)
        .subscribe(
          () => this.router.navigate(['/users'])
        );
    }
  }
}
