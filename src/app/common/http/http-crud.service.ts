import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { HttpCrudOperations } from './http-crud-operations';
import { Identifiable } from '../model/identifiable';

export abstract class HttpCrudService<T extends Identifiable<ID>, ID> implements HttpCrudOperations<T, ID> {

  protected abstract readonly entityName;

  // protected because it must be implemented on subclass for Angular DI
  protected constructor(protected httpClient: HttpClient) {}

  protected get entityPath(): string {
    return `https://jsonplaceholder.typicode.com/${this.entityName}`;
  }

  getList$(): Observable<T[]> {
    return this.httpClient.get<T[]>(this.entityPath)
      .pipe(
        catchError(this.handleError)
      );
  }

  getById$(id: ID): Observable<T> {
    console.log(`${this.entityPath}/${id}`);
    return this.httpClient.get<T>(`${this.entityPath}/${id}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  create$(object: Identifiable<ID>): Observable<T> {
    return this.httpClient.post<T>(this.entityPath, object)
      .pipe(
        catchError(this.handleError)
      );
  }

  update$(object: Identifiable<ID>): Observable<T> {
    return this.httpClient.put<T>(`${this.entityPath}/${object.id}`, object)
      .pipe(
        catchError(this.handleError)
      );
  }

  save$(object: Identifiable<ID>): Observable<T> {
    return object.id ? this.update$(object) : this.create$(object);
  }

  delete$(id: ID): Observable<T> {
    return this.httpClient.delete<T>(`${this.entityPath}/${id}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse): Observable<any> {
    if (error.error instanceof ErrorEvent) {
      // client-side or network error
      return throwError(`An error occurred: ${error.error.message}`);
    }
    return throwError(`Server returned code ${error.status}`);
  }
}
