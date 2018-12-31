import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

/**
 * Base Http class.
 * Allows custom methods to be included on a sub-class.
 * Equivalent to Repository in Spring Data.
 */
export abstract class HttpService {

  // protected because it must be implemented on subclass for Angular DI
  protected constructor(protected httpClient: HttpClient) {}

  protected handleError(error: HttpErrorResponse): Observable<any> {
    if (error.error instanceof ErrorEvent) {
      // client-side or network error
      return throwError(`An error occurred: ${error.error.message}`);
    }
    return throwError(`Server returned code ${error.status}`);
  }
}
