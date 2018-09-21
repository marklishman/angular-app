import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { HttpService } from './http.service';

describe('HttpService', () => {

  class CustomHttpService extends HttpService {
    constructor(http: HttpClient) {
      super(http);
    }

    public handleError(error: HttpErrorResponse): Observable<any> {
      return super.handleError(error);
    }

  }

  let customHttpService: CustomHttpService;
  const httpClient: HttpClient = null;

  beforeEach(() => {
    customHttpService = new CustomHttpService(httpClient);
  });

  describe('handleError', () => {

    it('should handle error events', (done: DoneFn) => {
      const httpErrorResponse = {
        error: new ErrorEvent('error', {
          message : 'some error event'
        })
      } as HttpErrorResponse;

      customHttpService.handleError(httpErrorResponse)
        .subscribe(
          () => fail('should throw an error'),
          error => {
            expect(error).toBe('An error occurred: some error event');
            done();
          }
        );
    });

    it('should handle server errors', (done: DoneFn) => {
      const httpErrorResponse = {
        status: 404
      } as HttpErrorResponse;

      customHttpService.handleError(httpErrorResponse)
        .subscribe(
          () => fail('should throw an error'),
          error => {
            expect(error).toBe('Server returned code 404');
            done();
          }
        );
    });

  });
});
