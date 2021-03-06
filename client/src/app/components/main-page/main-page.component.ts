import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Course } from '../../../../../common/communication/course';
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
  acronyms: string[] = [];
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
    this.courseService.getExistingCourses().subscribe((existingCourses: Course[]) => {
      if(!existingCourses) return;
      this.acronyms = [];
      for (const course of existingCourses) {
        this.acronyms.push(course.acronym);
      }
    });
  }

  private _filter(name: string): string[] {
    const filterValue = name.toLowerCase();
    const matchingElements: string[]  = this.acronyms.filter((option) => option.toLowerCase().indexOf(filterValue) === 0);
    return matchingElements;
  }

}
