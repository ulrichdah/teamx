import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountType } from 'src/app/classes/constants';
import { CourseService } from 'src/app/services/course.service';
import { Course } from '../../../../../common/communication/course';
import { User, UserCourse } from '../../../../../common/communication/users';

@Component({
  selector: 'app-course-view',
  templateUrl: './course-view.component.html',
  styleUrls: ['./course-view.component.scss']
})
export class CourseViewComponent implements OnInit {
  currentCourse: Course | undefined;
  usersAlone: User[];
  usersIncompleteTeam: User[];
  // tslint:disable-next-line:no-any
  users: any = [
    {title: 'string', name: 'string', description: 'string', imageSrc: 'https://material.angular.io/assets/img/examples/shiba2.jpg'},
    {title: 'string1', name: 'string1', description: 'string1', imageSrc: 'https://material.angular.io/assets/img/examples/shiba2.jp'},
    {title: 'string1', name: 'string1', description: 'string1', imageSrc: 'https://material.angular.io/assets/img/examples/shiba2.jp'},
    {title: 'string1', name: 'string1', description: 'string1', imageSrc: 'https://material.angular.io/assets/img/examples/shiba2.jp'},
    {title: 'string1', name: 'string1', description: 'string1', imageSrc: 'https://material.angular.io/assets/img/examples/shiba2.jp'},
    {title: 'string2', name: 'string2', description: 'string2', imageSrc: 'https://material.angular.io/assets/img/examples/shiba2.jp'}
  ];

  constructor(private route: ActivatedRoute, private router: Router, private courseService: CourseService) { }

  ngOnInit(): void {
    this.initView();
  }

  private initView(): void {
    const courseIdFromRoute = this.route.snapshot.paramMap.get('courseId');
    this.currentCourse = this.courseService.existingCourses.find((course: Course) => {
      return course.acronym === courseIdFromRoute;
    });
    if (!this.currentCourse) {
      this.router.navigate(['home']);
      return;
    }
    this.courseService.getUsersByCourse(this.currentCourse.acronym).subscribe((users: User[]) => {
      for (const user of users) {
        this.removeOtherCourses(user);
      }
      this.usersAlone = this.filterByAccountType(users, AccountType.ALONE);
      this.usersIncompleteTeam = this.filterByAccountType(users, AccountType.INCOMPLETE_TEAM);
    });
  }

  private filterByAccountType(allUsers: User[], accountType: AccountType): User[] {
    return allUsers.filter((user: User) => {
      return user.accountType === accountType;
    });
  }

  private removeOtherCourses(user: User): void {
    let courseToKeep: UserCourse = {} as UserCourse;
    for (const course of user.courses) {
      if (course.acronym === this.currentCourse?.acronym) {
        courseToKeep = course;
        break;
      }
    }
    user.courses = [courseToKeep];
  }

}
