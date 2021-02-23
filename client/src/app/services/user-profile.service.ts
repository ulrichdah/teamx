import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from '../../../../common/communication/users';
import { HttpRequestService } from './http-request.service';

@Injectable({
  providedIn: 'root'
})
export class UserProfileService extends HttpRequestService {

  private readonly PATH: string = this.BASE_URL + '/user-persistence';

  constructor(private http: HttpClient) {
    super();
  }

  getUser(username: string): Observable<User> {
    return this.http.get<User>(this.PATH + '/getUser/' + username).pipe(catchError(this.handleError<User>('Get for user information')));
  }

  updateInfo(newInfo: User): Observable<boolean> {
    return this.http.patch<boolean>(this.PATH + '/updateUser', newInfo).pipe(catchError(this.handleError<boolean>('Update user information')));
  }
}
