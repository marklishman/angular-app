import { UserViewComponent } from './user-view.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import createSpyObj = jasmine.createSpyObj;
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { UserService } from '../../services/user.service';
import { APP_BASE_HREF } from '@angular/common';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { of } from 'rxjs';

import * as userFixture from '../../../testing/user-fixture';

describe('UserViewComponent', () => {

  const USER_ID = 123;

  let component: UserViewComponent;
  let fixture: ComponentFixture<UserViewComponent>;

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
        UserViewComponent
      ],
      schemas: [ NO_ERRORS_SCHEMA ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('ngOnInit', () => {
    it('should get the user for the specified id', () => {
      expect(userService.getUser$).toHaveBeenCalledWith(USER_ID);
    });

  });
});
