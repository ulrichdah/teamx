import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from '../../../../common/communication/users';

@Injectable({
  providedIn: 'root'
})
export class UserRegistrationService {

  private readonly BASE_URL: string = 'http://localhost:3000/api/user-persistence';

  constructor(private http: HttpClient) { }

  isExistingUsername(username: string): Observable<boolean> {
    return this.http.post<boolean>(this.BASE_URL + '/username-existence', {username})
    .pipe(catchError(this.handleError<boolean>('Existing usernames get')));
  }

  addUser(newUser: User): Observable<boolean> {
    return this.http.post<boolean>(this.BASE_URL + '/addUser', newUser).pipe(catchError(this.handleError<boolean>('New user post')));
  }

  private handleError<T>(request: string, result?: T): (error: Error) => Observable<T> {
      return (error: Error): Observable<T> => {
          return of(result as T);
      };
  }
}
