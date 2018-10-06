import { OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { UserService } from '../../services/user.service';
import { User } from '../../../model/user/user';

export abstract class AbstractUserViewComponent implements OnInit {

  user$: Observable<User>;

  protected constructor(protected userService: UserService,
                        protected router: Router,
                        protected route: ActivatedRoute) {}

  ngOnInit() {
    const userId = +this.route.snapshot.paramMap.get('userId');
    this.user$ = this.userService.getUser$(userId);
  }
}
