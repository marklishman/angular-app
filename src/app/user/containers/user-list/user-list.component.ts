import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject, combineLatest, merge, Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';

import { UserService } from '../../services/user.service';
import { User } from '../../../model/user/user';

@Component({
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  users$: Observable<User[]>;
  reset$ = new BehaviorSubject<string>('');
  search = new FormControl();

  constructor(private userService: UserService,
              private router: Router) {
  }

  ngOnInit() {

    const userData$ = this.userService.getUserList$();

    const searchText$ = this.search.valueChanges
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        map(searchText => searchText.trim().toLowerCase()),
      );

    const filterTrigger$ = merge(searchText$, this.reset$);

    this.users$ = combineLatest(userData$, filterTrigger$)
      .pipe(
        map(([users, searchText]) =>
          users.filter(user => user.fullName.toLowerCase().includes(searchText.toLowerCase()))
        ));
  }

  resetSearch(): void {
    this.reset$.next('');
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
