import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { UserDto } from './dto/user-dto';

@Injectable({
  providedIn: 'root'
})
export class UserHttpService {

  private readonly Url = 'https://jsonplaceholder.typicode.com/users';

  constructor(private http: HttpClient) {
  }

  getUsers$(): Observable<UserDto[]> {
    return this.http.get<UserDto[]>(this.Url)
      .pipe(
        catchError(this.handleError)
      );
  }

  getUser$(userId: number): Observable<UserDto> {
    return this.http.get<UserDto>(`${this.Url}/${userId}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  saveUser(user: UserDto): Observable<UserDto> {
    return this.http.post<UserDto>(this.Url, user)
      .pipe(
        catchError(this.handleError)
      );
  }

  deleteUser(userId: number): Observable<UserDto> {
    return this.http.delete<UserDto>(`${this.Url}/${userId}`)
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
