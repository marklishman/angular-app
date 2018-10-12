import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';
import { Router } from '@angular/router';
import { of } from 'rxjs';

import { UserListComponent } from './user-list.component';
import { UserService } from '../../services/user.service';
import { ComponentFixtureUtils } from '../../../testing/utils/component-fixture-utils';
import * as userFixture from '../../../model/user/user-fixture';
import createSpyObj = jasmine.createSpyObj;

describe('UserListComponent', () => {

  let component: UserListComponent;
  let userService: UserService;

  beforeEach(() => {
    userService = createSpyObj<UserService>('userService', {
      'getUserList$': of(userFixture.users),
      'getUser$': of(userFixture.firstUser),
      'saveUser$': of(userFixture.firstUser),
      'deleteUser$': of(userFixture.firstUser)
    });
  });

  describe('Class', () => {

    beforeEach(() => {
      // TODO include router
      component = new UserListComponent(
        userService,
        null
      );
      component.ngOnInit();
    });

    it('should not delete the user if the confirmation dialog is cancelled', () => {
      // TODO do this!
    });
  });

  describe('Component', () => {

    let fixture: ComponentFixture<UserListComponent>;
    let fixtureUtils: ComponentFixtureUtils<UserListComponent>;

    const userNameCss = 'ul > li > a:nth-child(1)';
    const routerSpy = createSpyObj('Router', ['navigate']);

    beforeEach(async(() => {
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

    describe('template', () => {
      it('should display the correct heading', () => {
        expect(fixtureUtils.getElementText('h1')).toBe('Users');
      });
    });

    describe('ngOnInit', () => {
      it('should display the correct user names', fakeAsync(() => {
        expect(fixtureUtils.getAllElementText(userNameCss)).toEqual([
          'Leanne Graham',
          'Ervin Howell'
        ]);
      }));
    });

    describe('search', () => {
      it('should filter the users when text is entered in the search box', fakeAsync(() => {
        fixtureUtils.setElementValue('#t-search-box', 'Ervin');
        tick(500);
        fixture.detectChanges();

        expect(fixtureUtils.getAllElementText(userNameCss)).toEqual([
          'Ervin Howell'
        ]);
      }));

      it('should filter the users regardless of case', fakeAsync(() => {
        fixtureUtils.setElementValue('#t-search-box', 'GRAHAM');
        tick(500);
        fixture.detectChanges();

        expect(fixtureUtils.getAllElementText(userNameCss)).toEqual([
          'Leanne Graham'
        ]);
      }));

      it('should filter the users after trimming the search term', fakeAsync(() => {
        fixtureUtils.setElementValue('#t-search-box', '   Howell   ');
        tick(500);
        fixture.detectChanges();

        expect(fixtureUtils.getAllElementText(userNameCss)).toEqual([
          'Ervin Howell'
        ]);
      }));

      // NOTE: this doesn't work!
      // Seems to be related to async pipe.
      // Works if shared() is used in user$ pipe()
      xit('will not work', (done: DoneFn) => {
        component.search.setValue('vin');
        component.users$.subscribe(
          users => {
            expect(users.length).toBe(1);
            done();
          }
        )
      });
    });

    describe('reset', () => {
      it('should empty the search box and display all users', fakeAsync(() => {

        fixtureUtils.setElementValue('#t-search-box', 'Howell');
        tick(500);
        fixture.detectChanges();

        expect(fixtureUtils.getAllElementText(userNameCss)).toEqual([
          'Ervin Howell'
        ]);

        fixtureUtils.click('#t-clear');
        tick();
        fixture.detectChanges();

        expect(fixtureUtils.getAllElementText(userNameCss)).toEqual([
          'Leanne Graham',
          'Ervin Howell'
        ]);
      }));
    });

    describe('navigation', () => {
      // TODO test navigation
      xit('should go to the Add User page', () => {
        fixtureUtils.click('#t-add');
        expect(fixtureUtils.getElementText('h1')).toBe('Add User');
      });
    });
  });
});
