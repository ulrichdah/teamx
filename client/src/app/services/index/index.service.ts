import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UserLoginInfo } from '../../../../../common/communication/user-login-info';

@Injectable({
    providedIn: 'root',
})
export class IndexService {
    private readonly BASE_URL: string = 'http://localhost:3000/api/index';

    constructor(private http: HttpClient) { }

    basicGet(): Observable<UserLoginInfo> {
        return this.http.get<UserLoginInfo>(this.BASE_URL).pipe(catchError(this.handleError<UserLoginInfo>('basicGet')));
    }

    basicPost(message: UserLoginInfo): Observable<void> {
        return this.http.post<void>(this.BASE_URL + '/send', message);
    }

    private handleError<T>(request: string, result?: T): (error: Error) => Observable<T> {
        return (error: Error): Observable<T> => {
            return of(result as T);
        };
    }
}
