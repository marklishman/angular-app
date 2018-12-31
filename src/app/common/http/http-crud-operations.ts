import { Observable } from 'rxjs';
import { Identifiable } from '../model/identifiable';

/**
 * Defines the CRUD operations.
 *
 * Allows multiple Http Crud implementations to be used (eg HATEOAS).
 */

export interface HttpCrudOperations<T extends Identifiable<ID>, ID> {

  getList$(): Observable<T[]>;

  getById$(id: ID): Observable<T>;

  create$(object: Identifiable<ID>): Observable<T>;

  update$(object: Identifiable<ID>): Observable<T>;

  save$(object: Identifiable<ID>): Observable<T>;

  delete$(id: ID): Observable<T>;

}
