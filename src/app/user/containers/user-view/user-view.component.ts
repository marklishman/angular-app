import { Component } from '@angular/core';

import { AbstractUserViewComponent } from './abstract-user-view.component';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.scss']
})
export class UserViewComponent extends AbstractUserViewComponent {

  constructor(userService: UserService,
              router: Router,
              route: ActivatedRoute) {
    super(userService, router, route);
  }
}
