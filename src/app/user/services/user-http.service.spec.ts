import { UserHttpService } from './user-http.service';
import { HttpClient } from '@angular/common/http';
import { of, throwError } from 'rxjs';

import * as userFixture from '../../testing/data-fixtures/user-data-fixture';
import createSpyObj = jasmine.createSpyObj;
import Spy = jasmine.Spy;
import { TestBed } from '@angular/core/testing';

describe('UserHttpService', () => {

  let userHttpService: UserHttpService;
  let httpClient: HttpClient;

  const userId = 123;

  const RxPipeFailure = createSpyObj({
    'pipe': throwError('ERROR')
  });

  // TODO reduce duplication

  describe('getUserList$', () => {

    beforeEach(() => {
      httpClient = createSpyObj<HttpClient>({
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
      httpClient = createSpyObj<HttpClient>({
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

  describe('Dependency Injection', () => {

    beforeEach(() => {
      httpClient = createSpyObj<HttpClient>({
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
