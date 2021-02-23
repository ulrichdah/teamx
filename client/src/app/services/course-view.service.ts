import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Course } from '../../../../common/communication/course';
import { User } from '../../../../common/communication/users';
import { HttpRequestService } from './http-request.service';

@Injectable({
  providedIn: 'root'
})
export class CourseViewService extends HttpRequestService {

  existingCourses: Course[];
  private readonly PATH: string = this.BASE_URL + '/course-persistence';

  constructor(private http: HttpClient) {
    super();
    this.refreshExistingCourses();
  }

  refreshExistingCourses(): void {
    this.getExistingCourses().subscribe((extistingCourses) => {
      this.existingCourses = extistingCourses;
    });
  }

  getUsersByCourse(acronym: string): Observable<User[]> {
    return this.http.get<User[]>(this.BASE_URL + '/user-persistence/getUsersByCourse/' + acronym)
    .pipe(catchError(this.handleError<User[]>('Users of course get')));
  }

  private getExistingCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(this.PATH + '/getExistingCourses').pipe(catchError(this.handleError<Course[]>('Existing courses get')));
  }
}
