import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { LoginResult, UserLoginInfo } from '../../../../common/communication/user-login-info';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  isLoggedIn: boolean;
  private readonly BASE_URL: string = 'http://localhost:3000/api/user-persistence';

  constructor(private http: HttpClient) {
    this.isLoggedIn = false;
  }

  login(userInfo: UserLoginInfo): Observable<LoginResult> {
      return this.http.post<LoginResult>(this.BASE_URL + '/login', userInfo).pipe(catchError(this.handleError<LoginResult>('Login request')));
  }

  private handleError<T>(request: string, result?: T): (error: Error) => Observable<T> {
      return (error: Error): Observable<T> => {
          return of(result as T);
      };
  }
}
