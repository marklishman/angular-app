import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { UserHttpService } from '../../services/user-http.service';
import { UserDto } from '../../services/dto/user-dto';

@Component({
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.scss']
})
export class UserViewComponent implements OnInit {

  user$: Observable<UserDto>;

  constructor(private userService: UserHttpService,
              private router: Router,
              private route: ActivatedRoute) {}

  ngOnInit() {
    const userId = +this.route.snapshot.paramMap.get('userId');
    this.user$ = this.userService.getUser$(userId);
  }

}
