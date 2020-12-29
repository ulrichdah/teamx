import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Course } from 'src/app/classes/course';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss']
})
export class CourseListComponent implements OnInit {
  currentCourse: Course;
  courses: Course[] = [
    {
      id: 'Mary', name: 'Mary', students: [
        {title: 'string', name: 'string', description: 'string', imageSrc: 'https://material.angular.io/assets/img/examples/shiba2.jpg'},
        {title: 'string1', name: 'string1', description: 'string1', imageSrc: 'https://material.angular.io/assets/img/examples/shiba2.jp'},
        {title: 'string1', name: 'string1', description: 'string1', imageSrc: 'https://material.angular.io/assets/img/examples/shiba2.jp'},
        {title: 'string1', name: 'string1', description: 'string1', imageSrc: 'https://material.angular.io/assets/img/examples/shiba2.jp'},
        {title: 'string1', name: 'string1', description: 'string1', imageSrc: 'https://material.angular.io/assets/img/examples/shiba2.jp'},
        {title: 'string2', name: 'string2', description: 'string2', imageSrc: 'https://material.angular.io/assets/img/examples/shiba2.jp'}
      ]
    }
  ];

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    const courseIdFromRoute = this.route.snapshot.paramMap.get('courseId');
    const courseTemp: Course |undefined = this.courses.find((course: Course) => {
      return course.id === courseIdFromRoute;
    });
    if (courseTemp) {
      this.currentCourse = courseTemp;
    } else {
      this.router.navigate(['home']);
    }
  }

}
