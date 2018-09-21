import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { HttpCrudOperations } from './http-crud-operations';
import { Identifiable } from '../model/identifiable';
import { HttpService } from './http.service';

export abstract class HttpCrudService<T extends Identifiable<ID>, ID>
  extends HttpService
  implements HttpCrudOperations<T, ID> {

  // protected because it must be implemented on subclass for Angular DI
  protected constructor(private entityName: string, httpClient: HttpClient) {
    super(httpClient);
  }

  protected get entityPath(): string {
    return `https://jsonplaceholder.typicode.com/${this.entityName}`;
    // Spring Data Rest
    // return `api/${this.entityName}`;
  }

  getList$(): Observable<T[]> {
    return this.httpClient.get<T[]>(this.entityPath)
      .pipe(
        // map((data: any) => data._embedded.users),
        catchError(this.handleError)
      );
  }

  getById$(id: ID): Observable<T> {
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
}
