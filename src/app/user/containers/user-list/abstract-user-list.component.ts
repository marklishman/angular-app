import { OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject, combineLatest, merge, Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';

import { UserService } from '../../services/user.service';
import { User } from '../../../model/user/user';
import { lowerCaseTrim } from '../../../common/rxjs/operators';

export abstract class AbstractUserListComponent implements OnInit {

  users$: Observable<User[]>;
  reset$ = new BehaviorSubject<string>('');
  search = new FormControl();

  protected constructor(protected userService: UserService,
                        protected router: Router) {}

  ngOnInit() {

    const userData$ = this.userService.getUserList$();

    const searchText$ = this.search.valueChanges
      .pipe(
        debounceTime(500),
        lowerCaseTrim(),
        distinctUntilChanged(),
      );
    const filterTrigger$ = merge(searchText$, this.reset$);

    this.users$ = combineLatest(userData$, filterTrigger$)
      .pipe(
        map(([users, searchText]) =>
          users.filter(user => user.fullName.toLowerCase().includes(searchText))
        ));
  }

  resetSearch(): void {
    this.reset$.next('');
  }

}
