import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from '../../../../common/communication/users';

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {

  private readonly BASE_URL: string = 'http://localhost:3000/api/user-persistence';

  constructor(private http: HttpClient) { }

  getUser(username: string): Observable<User> {
    return this.http.get<User>(this.BASE_URL + '/getUser/' + username).pipe(catchError(this.handleError<User>('Get for user information')));
  }

  private handleError<T>(request: string, result?: T): (error: Error) => Observable<T> {
    return (error: Error): Observable<T> => {
        return of(result as T);
    };
  }
}
