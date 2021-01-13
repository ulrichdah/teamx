import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { LoginResult, UserLoginInfo } from '../../../../common/communication/user-login-info';

const COOKIE_DURATION = 30;

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  loginResult: LoginResult;
  private readonly BASE_URL: string = 'http://localhost:3000/api/user-persistence';

  constructor(private cookieService: CookieService, private http: HttpClient) {
    this.loginResult = {isLoggedIn: true, username: 'admin'} as LoginResult;
  }

  login(userInfo: UserLoginInfo): Observable<LoginResult> {
      return this.http.post<LoginResult>(this.BASE_URL + '/login', userInfo).pipe(catchError(this.handleError<LoginResult>('Login request')));
  }

  setLoginState(loginResult: LoginResult): void {
    this.loginResult = loginResult;
    const expirationDate = new Date();
    expirationDate.setMinutes(expirationDate.getMinutes() + COOKIE_DURATION);
    this.cookieService.set('sessionId', loginResult.sessionId, expirationDate);
    this.cookieService.set('username', loginResult.username, expirationDate);
  }

  setLogoutState(): void {
    this.loginResult.isLoggedIn = false;
    this.cookieService.delete('sessionId');
    this.cookieService.delete('username');
  }

  private handleError<T>(request: string, result?: T): (error: Error) => Observable<T> {
      return (error: Error): Observable<T> => {
          return of(result as T);
      };
  }
}
