import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { UserDto } from '../../model/user/user-dto';

@Injectable({
  providedIn: 'root'
})
export class UserHttpService {

  private readonly Url = 'https://jsonplaceholder.typicode.com/users';

  constructor(private httpClient: HttpClient) {
  }

  getUserList$(): Observable<UserDto[]> {
    return this.httpClient.get<UserDto[]>(this.Url)
      .pipe(
        catchError(this.handleError)
      );
  }

  getUser$(userId: number): Observable<UserDto> {
    return this.httpClient.get<UserDto>(`${this.Url}/${userId}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  createUser$(user: UserDto): Observable<UserDto> {
    return this.httpClient.post<UserDto>(this.Url, user)
      .pipe(
        catchError(this.handleError)
      );
  }

  updateUser$(user: UserDto): Observable<UserDto> {
    return this.httpClient.put<UserDto>(`${this.Url}/${user.id}`, user)
      .pipe(
        catchError(this.handleError)
      );
  }

  saveUser$(user: UserDto): Observable<UserDto> {
    return user.id ? this.updateUser$(user) : this.createUser$(user);
  }

  deleteUser$(userId: number): Observable<UserDto> {
    return this.httpClient.delete<UserDto>(`${this.Url}/${userId}`)
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
