import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from '../../../../common/communication/users';
import { HttpRequestService } from './http-request.service';

@Injectable({
  providedIn: 'root'
})
export class UserRegistrationService extends HttpRequestService {

  private readonly PATH: string = this.BASE_URL + '/user-persistence';

  constructor(private http: HttpClient) {
    super();
  }

  isExistingUsername(username: string): Observable<boolean> {
    return this.http.post<boolean>(this.PATH + '/username-existence', {username})
    .pipe(catchError(this.handleError<boolean>('Username existence verification post')));
  }

  addUser(newUser: User): Observable<boolean> {
    return this.http.post<boolean>(this.PATH + '/addUser', newUser).pipe(catchError(this.handleError<boolean>('New user post')));
  }
}
