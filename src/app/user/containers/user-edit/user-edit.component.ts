import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';

import { UserService } from '../../services/user.service';
import { User, UserData } from '../../../model/user/user';
import { PlatformFeatures } from '../../../common/platform/PlatformFeatures';
import { PLATFORM_FEATURES } from '../../../app.module.shared';

@Component({
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {

  private userId: number | undefined;

  userForm = this.formBuilder.group({
    userName: [''],
    fullName: [''],
    email: [''],
    phone: [''],
    website: ['']
  });

  constructor(private userService: UserService,
              private router: Router,
              private route: ActivatedRoute,
              private formBuilder: FormBuilder,
              @Inject(PLATFORM_FEATURES) private platformFeatures: PlatformFeatures) {
  }

  ngOnInit() {
    const path = this.route.snapshot.routeConfig.path;
    if (path === 'users/new') {
      return;
    }

    this.userId = +this.route.snapshot.paramMap.get('userId');
    this.userService.getUser$(this.userId)
      .subscribe(
        user => {
          this.userForm.setValue({
            userName: user.userName,
            fullName: user.fullName,
            email: user.email,
            phone: user.phone,
            website: user.website
          });
        }
      );
  }

  onSubmit(): void {
    const userData: UserData = Object.assign({}, this.userForm.value, {id: this.userId });
    const user = new User(userData);
    const route = ['/users'];

    this.userService.saveUser$(user)
      .subscribe(
        (savedUser) => {
          if (this.platformFeatures.isMobile()) {

            // ----------------------------------
            // Only because user is not actually
            // saved when using JSONPlaceholder
            (<any>savedUser).id = 10;
            // ----------------------------------

            route.push(savedUser.id.toString());
          }
          this.router.navigate(route);
        }
      );
  }

}
