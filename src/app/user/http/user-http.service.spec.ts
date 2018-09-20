import { UserHttpService } from './user-http.service';
import { HttpClient } from '@angular/common/http';
import { of, throwError } from 'rxjs';

import * as userFixture from '../../testing/data-fixtures/user-data-fixture';
import { TestBed } from '@angular/core/testing';
import { UserDto } from '../../model/user/user-dto';
import createSpyObj = jasmine.createSpyObj;
import Spy = jasmine.Spy;

describe('HttpCrudService', () => {

  let userHttpService: UserHttpService;
  let httpClient: HttpClient;

  const userId = 123;

  beforeEach(() => {
    httpClient = createSpyObj<HttpClient>('httpClient', {
      'get': undefined, // could be getUserList$ or getUser$
      'post': of(userFixture.firstUserDto),
      'put': of(userFixture.firstUserDto),
      'delete': of({})
    });
    userHttpService = new UserHttpService(httpClient);
  });

  // TODO move to HttpCrudService

  describe('getList$', () => {
    beforeEach(() => {
      (<Spy>httpClient.get).and.returnValue(of(userFixture.userDtos));
    });

    it('should get a list of users', () => {
      userHttpService.getList$()
        .subscribe(
          actual => {
            expect(httpClient.get).toHaveBeenCalledWith('https://jsonplaceholder.typicode.com/users');
            expect(actual).toBe(userFixture.userDtos);
          }
        );
    });

    testHandleError('getList$');
  });

  describe('getById$', () => {
    beforeEach(() => {
      (<Spy>httpClient.get).and.returnValue(of(userFixture.firstUserDto));
    });

    it('should get a user', () => {
      userHttpService.getById$(userId)
        .subscribe(
          actual => {
            expect(httpClient.get).toHaveBeenCalledWith('https://jsonplaceholder.typicode.com/users/123');
            expect(actual).toBe(userFixture.firstUserDto);
          }
        );
    });

    testHandleError('getById$');
  });

  describe('create$', () => {
    it('should create a user', () => {
      userHttpService.create$(userFixture.firstUserDto)
        .subscribe(
          actual => {
            expect(httpClient.post).toHaveBeenCalledWith('https://jsonplaceholder.typicode.com/users', userFixture.firstUserDto);
            expect(actual).toBe(userFixture.firstUserDto);
          }
        );
    });

    testHandleError('create$');
  });

  describe('update$', () => {
    it('should update a user', () => {
      userHttpService.update$(userFixture.firstUserDto)
        .subscribe(
          actual => {
            expect(httpClient.put).toHaveBeenCalledWith('https://jsonplaceholder.typicode.com/users/1', userFixture.firstUserDto);
            expect(actual).toBe(userFixture.firstUserDto);
          }
        );
    });

    testHandleError('update$', userFixture.firstUserDto);
  });

  describe('save$', () => {
    it('should create a new user if the user object has no id', () => {
      const user = Object.assign({}, userFixture.firstUserDto, { id:  undefined});
      userHttpService.save$(user)
        .subscribe(
          () => {
            expect(httpClient.post).toHaveBeenCalledWith('https://jsonplaceholder.typicode.com/users', user);
            expect(httpClient.put).not.toHaveBeenCalled();
          }
        );
    });

    it('should update an existing user if the user object has an id', () => {
      userHttpService.save$(userFixture.firstUserDto)
        .subscribe(
          () => {
            expect(httpClient.put).toHaveBeenCalledWith('https://jsonplaceholder.typicode.com/users/1', userFixture.firstUserDto);
            expect(httpClient.post).not.toHaveBeenCalled();
          }
        );
    });
  });

  describe('delete$', () => {
    it('should delete a user', () => {
      userHttpService.delete$(userFixture.firstUserDto.id)
        .subscribe(
          actual => {
            expect(httpClient.delete).toHaveBeenCalledWith('https://jsonplaceholder.typicode.com/users/' + userFixture.firstUserDto.id);
            expect(actual).toEqual({} as UserDto);
          }
        );
    });

    testHandleError('delete$');
  });

  describe('handleError', () => {
    beforeEach(() => {
      httpClient = createSpyObj<HttpClient>('httpClient', {
        'get': of(userFixture.userDtos)
      });
      userHttpService = new UserHttpService(httpClient);
    });

    it('should handle error events', (done: DoneFn) => {
      (<Spy>httpClient.get).and.callFake(() => throwError({
        error: new ErrorEvent('error', {
          message : 'some error event'
        })
      }));

      userHttpService.getList$()
        .subscribe(
          () => fail('should throw an error'),
          error => {
            expect(error).toBe('An error occurred: some error event');
            done();
          }
        );
    });

    it('should handle server errors', (done: DoneFn) => {
      (<Spy>httpClient.get).and.callFake(() => throwError({status: 404}));

      userHttpService.getList$()
        .subscribe(
          () => fail('should throw an error'),
          error => {
            expect(error).toBe('Server returned code 404');
            done();
          }
        );
    });
  });

  describe('Dependency Injection', () => {
    beforeEach(() => {
      httpClient = createSpyObj<HttpClient>('httpClient', {
        'get': of(userFixture.firstUserDto)
      });

      TestBed.configureTestingModule({
        providers: [
          UserHttpService,
          { provide: HttpClient, useValue: httpClient },
        ]
      });

    });

    it('should inject the http client into the service', () => {
      const service: UserHttpService = TestBed.get(UserHttpService);
      service.getList$();
      expect(httpClient.get).toHaveBeenCalled();
    });

  });

  function testHandleError(methodName: string, params?: any): void {
    it('should handle any errors', (done: DoneFn) => {
      (<Spy>httpClient.get).and.callFake(() => throwError({}));
      (<Spy>httpClient.post).and.callFake(() => throwError({}));
      (<Spy>httpClient.put).and.callFake(() => throwError({}));
      (<Spy>httpClient.delete).and.callFake(() => throwError({}));
      spyOn(<any>userHttpService, 'handleError').and.callFake(() => throwError({}));

      userHttpService[methodName](params)
        .subscribe(
          () => fail('should throw an error'),
          () => {
            expect((<any>userHttpService).handleError).toHaveBeenCalled();
            done();
          }
        );
    });
  }

});
