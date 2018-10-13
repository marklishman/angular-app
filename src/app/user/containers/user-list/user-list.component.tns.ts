import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Page } from 'tns-core-modules/ui/page';
import { SearchBar } from "tns-core-modules/ui/search-bar";

import { UserService } from '../../services/user.service';
import { AbstractUserListComponent } from './abstract-user-list.component';

@Component({
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent extends AbstractUserListComponent implements AfterViewInit {

  @ViewChild("searchBar") searchBarEl: ElementRef;
  searchBar: SearchBar;

  constructor(userService: UserService,
              router: Router,
              private page: Page) {
    super(userService, router);
    page.actionBarHidden = true;
  }

  ngAfterViewInit(): void {
    this.searchBar = this.searchBarEl.nativeElement;
    // TODO couldn't get this to work
    this.searchBar.dismissSoftInput();
  }

  // TODO unit test
  addUser(event: any): void {
    this.router.navigate(['/users/new']);
  }
}
