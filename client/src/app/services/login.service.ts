import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { LoginResult, UserLoginInfo } from '../../../../common/communication/user-login-info';
import { HttpRequestService } from './http-request.service';

const COOKIE_DURATION = 30;

@Injectable({
  providedIn: 'root'
})
export class LoginService extends HttpRequestService {
  loginResult: LoginResult;
  private readonly PATH: string = this.BASE_URL + '/user-persistence';

  constructor(private cookieService: CookieService, private http: HttpClient) {
    super();
    if (this.cookieService.get('sessionId')) {
      this.loginResult = {isLoggedIn: true, username: this.cookieService.get('username'),
      sessionId: this.cookieService.get('sessionId')};
      const photo = localStorage.getItem('userPhoto');
      if(photo) this.loginResult.userPhoto = photo;
    } else {
      this.loginResult = {isLoggedIn: false} as LoginResult;
    }
  }

  login(userInfo: UserLoginInfo): Observable<LoginResult> {
      return this.http.post<LoginResult>(this.PATH + '/login', userInfo).pipe(catchError(this.handleError<LoginResult>('Login request')));
  }

  setLoginState(loginResult: LoginResult): void {
    this.loginResult = loginResult;
    const expirationDate = new Date();
    expirationDate.setMinutes(expirationDate.getMinutes() + COOKIE_DURATION);
    this.cookieService.set('sessionId', loginResult.sessionId, expirationDate);
    this.cookieService.set('username', loginResult.username, expirationDate);
    if (loginResult.userPhoto)
      localStorage.setItem('userPhoto', loginResult.userPhoto);
  }

  setLogoutState(): void {
    this.loginResult.isLoggedIn = false;
    this.cookieService.delete('sessionId');
    this.cookieService.delete('username');
    localStorage.removeItem('userPhoto');
  }
}
