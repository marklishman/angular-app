import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { UserDto } from '../../../model/user/user-dto';
import { UserService } from '../../services/user.service';
import { User } from '../../../model/user/user';

@Component({
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  users$: Observable<User[]>;
  search = new FormControl();

  constructor(private userService: UserService,
              private router: Router) { }

  ngOnInit() {
    this.users$ = this.userService.getUserList$();
    this.search.valueChanges
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        map(searchText => searchText.trim().toLowerCase())
      )
      .subscribe( searchText => this.applyFilter(searchText));
  }

  resetSearch(): void {
    this.search.reset(null, {emitEvent: false});
    this.applyFilter('');
  }

  onDelete(id: number): void {
    if (confirm('Are you sure?')) {
      this.userService.deleteUser$(id)
        .subscribe(
          () => this.router.navigate(['/users'])
        );
    }
  }

  private applyFilter(searchText: string): void {
    this.users$ = this.userService.getUserList$()
      .pipe(
        map(users => users.filter(
          user => user.fullName.toLowerCase().includes(searchText.toLowerCase())
        ))
      );
  }

}
