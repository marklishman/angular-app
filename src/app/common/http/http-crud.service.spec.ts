import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { Injectable } from '@angular/core';
import { of, throwError } from 'rxjs';

import { HttpCrudService } from './http-crud.service';
import { Identifiable } from '../model/identifiable';
import createSpyObj = jasmine.createSpyObj;
import Spy = jasmine.Spy;

describe('HttpCrudService', () => {

  // types

  interface TestDto extends Identifiable<number> {
    id: number;
    name: string;
  }

  @Injectable({
    providedIn: 'root'
  })
  class TestHttpCrudService extends HttpCrudService<TestDto, number> {
    constructor(http: HttpClient) {
      super('test', http);
    }
  }

  // constants

  const testUrl = 'https://jsonplaceholder.typicode.com/test';

  const firstTestDto = {
    id: 1,
    name: 'test DTO one'
  } as TestDto;

  const secondTestDto = {
    id: 1,
    name: 'test DTO one'
  } as TestDto;

  const testDtos = [
    firstTestDto,
    secondTestDto
  ];

  // objects

  let testHttpCrudService: TestHttpCrudService;
  let httpClient: HttpClient;

  beforeEach(() => {
    httpClient = createSpyObj<HttpClient>('httpClient', {
      'get': undefined,
      'post': of(firstTestDto),
      'put': of(firstTestDto),
      'delete': of({})
    });
    testHttpCrudService = new TestHttpCrudService(httpClient);
  });

  describe('getList$', () => {
    beforeEach(() => {
      (<Spy>httpClient.get).and.returnValue(of(testDtos));
    });

    it('should get a list of DTOs', () => {
      testHttpCrudService.getList$()
        .subscribe(
          actual => {
            expect(httpClient.get).toHaveBeenCalledWith(testUrl);
            expect(actual).toBe(testDtos);
          }
        );
    });

    testHandleError('getList$');
  });

  describe('getById$', () => {
    beforeEach(() => {
      (<Spy>httpClient.get).and.returnValue(of(firstTestDto));
    });

    it('should get a DTO', () => {
      testHttpCrudService.getById$(firstTestDto.id)
        .subscribe(
          actual => {
            expect(httpClient.get).toHaveBeenCalledWith(`${testUrl}/${firstTestDto.id}`);
            expect(actual).toBe(firstTestDto);
          }
        );
    });

    testHandleError('getById$');
  });

  describe('create$', () => {
    it('should post a DTO', () => {
      testHttpCrudService.create$(firstTestDto)
        .subscribe(
          actual => {
            expect(httpClient.post).toHaveBeenCalledWith(testUrl, firstTestDto);
            expect(actual).toBe(firstTestDto);
          }
        );
    });

    testHandleError('create$');
  });

  describe('update$', () => {
    it('should put a DTO', () => {
      testHttpCrudService.update$(firstTestDto)
        .subscribe(
          actual => {
            expect(httpClient.put).toHaveBeenCalledWith(`${testUrl}/${firstTestDto.id}`, firstTestDto);
            expect(actual).toBe(firstTestDto);
          }
        );
    });

    testHandleError('update$', firstTestDto);
  });

  describe('save$', () => {
    it('should post a DTO if the DTO object has no id', () => {
      const testDto = Object.assign({}, firstTestDto, { id:  undefined});
      testHttpCrudService.save$(testDto)
        .subscribe(
          () => {
            expect(httpClient.post).toHaveBeenCalledWith(testUrl, testDto);
            expect(httpClient.put).not.toHaveBeenCalled();
          }
        );
    });

    it('should put a DTO if the DTO object has an id', () => {
      testHttpCrudService.save$(firstTestDto)
        .subscribe(
          () => {
            expect(httpClient.put).toHaveBeenCalledWith(`${testUrl}/${firstTestDto.id}`, firstTestDto);
            expect(httpClient.post).not.toHaveBeenCalled();
          }
        );
    });
  });

  describe('delete$', () => {
    it('should delete a DTO', () => {
      testHttpCrudService.delete$(firstTestDto.id)
        .subscribe(
          actual => {
            expect(httpClient.delete).toHaveBeenCalledWith(`${testUrl}/${firstTestDto.id}`);
            expect(actual).toEqual({} as TestDto);
          }
        );
    });

    testHandleError('delete$');
  });

  describe('Dependency Injection', () => {
    beforeEach(() => {
      httpClient = createSpyObj<HttpClient>('httpClient', {
        'get': of(firstTestDto)
      });

      TestBed.configureTestingModule({
        providers: [
          TestHttpCrudService,
          { provide: HttpClient, useValue: httpClient },
        ]
      });

    });

    it('should inject the http client into the service', () => {
      const service: TestHttpCrudService = TestBed.get(TestHttpCrudService);
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
      spyOn(<any>testHttpCrudService, 'handleError').and.callFake(() => throwError({}));

      testHttpCrudService[methodName](params)
        .subscribe(
          () => fail('should throw an error'),
          () => {
            expect((<any>testHttpCrudService).handleError).toHaveBeenCalled();
            done();
          }
        );
    });
  }
});
