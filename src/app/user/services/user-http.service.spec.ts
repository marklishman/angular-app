import { UserHttpService } from './user-http.service';
import { HttpClient } from '@angular/common/http';
import { of, throwError } from 'rxjs';

import * as userFixture from '../../testing/data-fixtures/user-data-fixture';
import { TestBed } from '@angular/core/testing';
import { UserDto } from './dto/user-dto';
import createSpyObj = jasmine.createSpyObj;
import Spy = jasmine.Spy;

describe('UserHttpService', () => {

  let userHttpService: UserHttpService;
  let httpClient: HttpClient;

  const userId = 123;

  const RxPipeFailure = createSpyObj({
    'pipe': throwError('ERROR')
  });

  // TODO remove duplication (errors)

  describe('getUserList$', () => {
    beforeEach(() => {
      httpClient = createSpyObj<HttpClient>('httpClient', {
        'get': of(userFixture.userDtos)
      });
      userHttpService = new UserHttpService(httpClient);
    });

    it('should get a list of users', () => {
      userHttpService.getUserList$()
        .subscribe(
          actual => {
            expect(httpClient.get).toHaveBeenCalledWith('https://jsonplaceholder.typicode.com/users');
            expect(actual).toBe(userFixture.userDtos);
          }
        );
    });

    it('should handle any errors', (done: DoneFn) => {
      (<Spy>httpClient.get).and.returnValue(RxPipeFailure);

      userHttpService.getUserList$()
        .subscribe(
          () => fail('should throw an error'),
          error => {
            expect(error).toBe('ERROR');
            done();
          }
        );
    });
  });

  describe('getUser$', () => {
    beforeEach(() => {
      httpClient = createSpyObj<HttpClient>('httpClient', {
        'get': of(userFixture.firstUserDto)
      });
      userHttpService = new UserHttpService(httpClient);
    });

    it('should get a user', () => {
      userHttpService.getUser$(userId)
        .subscribe(
          actual => {
            expect(httpClient.get).toHaveBeenCalledWith('https://jsonplaceholder.typicode.com/users/123');
            expect(actual).toBe(userFixture.firstUserDto);
          }
        );
    });

    it('should handle any errors', (done: DoneFn) => {
      (<Spy>httpClient.get).and.returnValue(RxPipeFailure);

      userHttpService.getUser$(userId)
        .subscribe(
          () => fail('should throw an error'),
          error => {
            expect(error).toBe('ERROR');
            done();
          }
        );
    });
  });

  describe('createUser$', () => {
    beforeEach(() => {
      httpClient = createSpyObj<HttpClient>('httpClient', {
        'post': of(userFixture.firstUserDto)
      });
      userHttpService = new UserHttpService(httpClient);
    });

    it('should create a user', () => {
      userHttpService.createUser$(userFixture.firstUserDto)
        .subscribe(
          actual => {
            expect(httpClient.post).toHaveBeenCalledWith('https://jsonplaceholder.typicode.com/users', userFixture.firstUserDto);
            expect(actual).toBe(userFixture.firstUserDto);
          }
        );
    });

    it('should handle any errors', (done: DoneFn) => {
      (<Spy>httpClient.post).and.returnValue(RxPipeFailure);

      userHttpService.createUser$(userFixture.firstUserDto)
        .subscribe(
          () => fail('should throw an error'),
          error => {
            expect(error).toBe('ERROR');
            done();
          }
        );
    });
  });

  describe('updateUser$', () => {
    beforeEach(() => {
      httpClient = createSpyObj<HttpClient>('httpClient', {
        'put': of(userFixture.firstUserDto)
      });
      userHttpService = new UserHttpService(httpClient);
    });

    it('should update a user', () => {
      userHttpService.updateUser$(userFixture.firstUserDto)
        .subscribe(
          actual => {
            expect(httpClient.put).toHaveBeenCalledWith('https://jsonplaceholder.typicode.com/users/1', userFixture.firstUserDto);
            expect(actual).toBe(userFixture.firstUserDto);
          }
        );
    });

    it('should handle any errors', (done: DoneFn) => {
      (<Spy>httpClient.put).and.returnValue(RxPipeFailure);

      userHttpService.updateUser$(userFixture.firstUserDto)
        .subscribe(
          () => fail('should throw an error'),
          error => {
            expect(error).toBe('ERROR');
            done();
          }
        );
    });
  });

  describe('saveUser$', () => {
    beforeEach(() => {
      httpClient = createSpyObj<HttpClient>('httpClient', {
        'post': of(userFixture.firstUserDto),
        'put': of(userFixture.firstUserDto)
      });
      userHttpService = new UserHttpService(httpClient);
    });

    it('should create a new user if the user object has no id', () => {
      const user = Object.assign({}, userFixture.firstUserDto, { id:  undefined});
      userHttpService.saveUser$(user)
        .subscribe(
          () => {
            expect(httpClient.post).toHaveBeenCalledWith('https://jsonplaceholder.typicode.com/users', user);
            expect(httpClient.put).not.toHaveBeenCalled();
          }
        );
    });

    it('should update an existing user if the user object has an id', () => {
      userHttpService.saveUser$(userFixture.firstUserDto)
        .subscribe(
          () => {
            expect(httpClient.put).toHaveBeenCalledWith('https://jsonplaceholder.typicode.com/users/1', userFixture.firstUserDto);
            expect(httpClient.post).not.toHaveBeenCalled();
          }
        );
    });

    it('should handle any errors', (done: DoneFn) => {
      (<Spy>httpClient.put).and.returnValue(RxPipeFailure);

      userHttpService.saveUser$(userFixture.firstUserDto)
        .subscribe(
          () => fail('should throw an error'),
          error => {
            expect(error).toBe('ERROR');
            done();
          }
        );
    });
  });

  describe('deleteUser$', () => {
    beforeEach(() => {
      httpClient = createSpyObj<HttpClient>('httpClient', {
        'delete': of({})
      });
      userHttpService = new UserHttpService(httpClient);
    });

    it('should delete a user', () => {
      userHttpService.deleteUser$(userFixture.firstUserDto.id)
        .subscribe(
          actual => {
            expect(httpClient.delete).toHaveBeenCalledWith('https://jsonplaceholder.typicode.com/users/' + userFixture.firstUserDto.id);
            expect(actual).toEqual({} as UserDto);
          }
        );
    });

    it('should handle any errors', (done: DoneFn) => {
      (<Spy>httpClient.delete).and.returnValue(RxPipeFailure);

      userHttpService.deleteUser$(userFixture.firstUserDto.id)
        .subscribe(
          () => fail('should throw an error'),
          error => {
            expect(error).toBe('ERROR');
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
      service.getUserList$();
      expect(httpClient.get).toHaveBeenCalled();
    });

  });

});
