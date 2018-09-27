import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';
import { Router } from '@angular/router';
import { of } from 'rxjs';

import { UserListComponent } from './user-list.component';
import { UserService } from '../../services/user.service';
import * as userFixture from '../../../model/user/user-fixture';
import { ComponentFixtureUtils } from '../../../testing/utils/component-fixture-utils';
import createSpyObj = jasmine.createSpyObj;

describe('UserListComponent', () => {

  let component: UserListComponent;
  let fixture: ComponentFixture<UserListComponent>;
  let fixtureUtils: ComponentFixtureUtils<UserListComponent>;

  const routerSpy = createSpyObj('Router', ['navigate']);
  let userService: UserService;

  beforeEach(async(() => {

    userService = createSpyObj<UserService>('userService', {
      'getUserList$': of(userFixture.users),
      'getUser$': of(userFixture.firstUser),
      'saveUser$': of(userFixture.firstUser),
      'deleteUser$': of(userFixture.firstUser)
    });

    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule
      ],
      declarations: [
        UserListComponent
      ],
      providers: [
        { provide: UserService, useValue : userService },
        { provide: APP_BASE_HREF, useValue : '/' },
        { provide: Router, useValue: routerSpy },
      ],
      schemas: [ NO_ERRORS_SCHEMA ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserListComponent);
    component = fixture.componentInstance;
    fixtureUtils = new ComponentFixtureUtils<UserListComponent>(fixture);
    fixture.detectChanges();
  });

  describe('ngOnInit', () => {
    it('should display the correct user names', fakeAsync(() => {
      const userNameCss = 'ul > li > a:nth-child(1)';
      expect(fixtureUtils.getAllElementTextByCss(userNameCss)).toEqual([
        'Leanne Graham',
        'Ervin Howell'
      ]);
    }));
  });
});
