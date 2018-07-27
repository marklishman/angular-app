import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../../model/user';
import { UserService } from '../../services/user.service';

@Component({
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {

  user$: Observable<User>;

  constructor(private userService: UserService,
              private router: Router,
              private route: ActivatedRoute) {}

  ngOnInit() {
    const userId = +this.route.snapshot.paramMap.get('userId');
    this.user$ = this.userService.getUser$(userId);
  }

}
