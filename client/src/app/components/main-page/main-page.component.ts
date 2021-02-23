import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { CourseService } from '../../services/course.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {
  readonly title: string = 'TEAMX';

  value: string;
  myControl: FormControl = new FormControl();
  acronyms: string[] = [
    'LOG2990',
    'INF1600',
    'INF1995'
  ];
  filteredOptions: Observable<string[]>;
  isExistingCourse: boolean = true;

  constructor(private router: Router, private courseService: CourseService) {}

  ngOnInit(): void {
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map((acronym) => acronym ? this._filter(acronym) : this.acronyms.slice())
      );
    this.getAcronyms();
  }

  onEnter(value: string): void {
    this.isExistingCourse = this.acronyms.includes(value);
    if (!this.isExistingCourse) return;
    this.router.navigate(['course-list/'+ value]);
  }

  displayFn(user: string): string {
    return user ? user : '';
  }

  private getAcronyms(): void {
    this.courseService.refreshExistingCourses();
    if(!this.courseService.existingCourses) return;
    this.acronyms = [];
    for (const course of this.courseService.existingCourses) {
      this.acronyms.push(course.acronym);
    }
  }

  private _filter(name: string): string[] {
    // make sure we are using the latest version (in case a new course has been added by another user)
    this.getAcronyms();

    const filterValue = name.toLowerCase();
    const matchingElements: string[]  = this.acronyms.filter((option) => option.toLowerCase().indexOf(filterValue) === 0);
    return matchingElements;
  }

}
