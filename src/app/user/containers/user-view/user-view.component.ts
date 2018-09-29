import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { UserService } from '../../services/user.service';
import { User } from '../../../model/user/user';

@Component({
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.scss']
})
export class UserViewComponent implements OnInit {

  user$: Observable<User>;

  constructor(private userService: UserService,
              private router: Router,
              private route: ActivatedRoute) {}

  ngOnInit() {
    const userId = +this.route.snapshot.paramMap.get('userId');
    this.user$ = this.userService.getUser$(userId);
  }
}
