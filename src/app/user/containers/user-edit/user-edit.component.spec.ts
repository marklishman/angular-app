import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { APP_BASE_HREF } from '@angular/common';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { of } from 'rxjs';

import { UserService } from '../../services/user.service';
import * as userFixture from '../../../testing/data-fixtures/user-data-fixture';
import { UserEditComponent } from './user-edit.component';
import createSpyObj = jasmine.createSpyObj;

describe('UserEditComponent', () => {

  const USER_ID = 123;

  let component: UserEditComponent;
  let fixture: ComponentFixture<UserEditComponent>;

  let userService: UserService;

  // TODO not used
  const routerSpy = createSpyObj('Router', ['navigate']);

  beforeEach(async(() => {

    userService = createSpyObj(
      { 'getUser$' : of(userFixture.firstUser) }
    );

    TestBed.configureTestingModule({
      imports: [
        RouterModule.forRoot([])
      ],
      providers: [
        { provide: UserService, useValue: userService },
        { provide: APP_BASE_HREF, useValue : '/' },
        { provide: Router, useValue: routerSpy },
        { provide: ActivatedRoute, useValue: {
            snapshot: {
              paramMap: {
                get: () => USER_ID
              }
            }
          }}
      ],
      declarations: [
        UserEditComponent
      ],
      schemas: [ NO_ERRORS_SCHEMA ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xdescribe('ngOnInit', () => {
    it('should get the user for the specified id', () => {
      expect(userService.getUser$).toHaveBeenCalledWith(USER_ID);
    });
  });

  // TODO check the values on the page

});
