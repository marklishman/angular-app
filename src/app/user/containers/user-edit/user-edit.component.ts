import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';

import { UserService } from '../../services/user.service';

@Component({
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {

  userForm = this.formBuilder.group({
    name: [''],
    username: [''],
    email: [''],
    phone: [''],
    website: ['']
  });

  constructor(private userService: UserService,
              private router: Router,
              private route: ActivatedRoute,
              private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    const path = this.route.snapshot.routeConfig.path;
    if (path === 'users/new') {
      return;
    }

    const userId = +this.route.snapshot.paramMap.get('userId');
    this.userService.getUser$(userId)
      .subscribe(
        user => {
          this.userForm.setValue({
            name: user.name,
            username: user.username,
            email: user.email,
            phone: user.phone,
            website: user.website
          });
        }
      );
  }

  onSubmit(): void {
    this.userService.saveUser(this.userForm.getRawValue())
      .subscribe(
        () => this.router.navigate(['/users'])
      );
  }

}
