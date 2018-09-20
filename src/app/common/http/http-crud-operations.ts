import { Observable } from 'rxjs';
import { Identifiable } from '../model/identifiable';

export interface HttpCrudOperations<T extends Identifiable<ID>, ID> {

  getList$(): Observable<T[]>;

  getById$(id: ID): Observable<T>;

  create$(object: Identifiable<ID>): Observable<T>;

  update$(object: Identifiable<ID>): Observable<T>;

  save$(object: Identifiable<ID>): Observable<T>;

  delete$(id: ID): Observable<T>;

}
