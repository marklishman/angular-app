import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { User } from '../../model/user';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly Url = 'https://jsonplaceholder.typicode.com/users';

  constructor(private http: HttpClient) {
  }

  getUsers$(): Observable<User[]> {
    return this.http.get<User[]>(this.Url)
      .pipe(
        catchError(this.handleError)
      );
  }

  getUser$(userId: number): Observable<User> {
    return this.http.get<User>(`${this.Url}/${userId}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  saveUser(user: User): Observable<User> {
    return this.http.post<User>(this.Url, user)
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse): Observable<any> {
    if (error.error instanceof ErrorEvent) {
      return throwError(`An error occurred: ${error.error.message}`);
    }
    return throwError(`Server returned code ${error.status}`);
  }
}
