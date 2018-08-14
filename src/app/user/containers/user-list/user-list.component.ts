import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { UserDto } from '../../services/dto/user-dto';
import { UserService } from '../../services/user.service';

@Component({
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  users$: Observable<UserDto[]>;
  search = new FormControl();

  constructor(private userService: UserService,
              private router: Router) { }

  ngOnInit() {
    this.users$ = this.userService.getUsers$();
    this.search.valueChanges
      .pipe(
        debounceTime(500),
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
      this.userService.deleteUser(id)
        .subscribe(
          () => this.router.navigate(['/users'])
        );
    }
  }

  private applyFilter(searchText: string): void {
    this.users$ = this.userService.getUsers$()
      .pipe(
        map(users => users.filter(
          user => user.name.toLowerCase().includes(searchText.toLowerCase())
        ))
      );
  }

}
