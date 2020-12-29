import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { AccountType, MAX_PASSWORD_LENGTH, MIN_PASSWORD_LENGTH } from 'src/app/classes/constants';

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.scss']
})
export class UserRegistrationComponent implements OnInit {

  accounts: string[] = [AccountType.ALONE, AccountType.INCOMPLETE_TEAM];
  hide: boolean = true;
  registrationForm: FormGroup;
  courseOptions: string[] = [
    'Mary',
    'Shelley',
    'Igor'
  ];
  filteredOptions: Observable<string[]>;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.registrationForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required, Validators.minLength(MIN_PASSWORD_LENGTH), Validators.maxLength(MAX_PASSWORD_LENGTH)],
      confirmPassword: ['', Validators.required,  Validators.minLength(MIN_PASSWORD_LENGTH), Validators.maxLength(MAX_PASSWORD_LENGTH)],
      email: ['', Validators.required, Validators.email],
      facebook: [''],
      courses: this.fb.array([])
    });
  }

  get courses(): FormArray {
    return this.registrationForm.get('courses') as FormArray;
  }

  onSubmit(): void {
    console.log('toto');
  }

  addCourse(): void {
    this.courses.push(this.fb.group({
      courseName:['', Validators.required],
      experiences:[''],
      goals:['', Validators.required],
      grade:[''],
      availabilities:[''],
    }));
    this.observeCourseField();
  }

  deleteCourse(index: number): void {
    this.courses.removeAt(index);
  }

  displayFn(course: string): string {
    return course && course ? course : '';
  }

  private _filter(name: string): string[] {
    const filterValue = name.toLowerCase();
    const matchingElements: string[]  = this.courseOptions.filter((option) => option.toLowerCase().indexOf(filterValue) === 0);
    return matchingElements;
  }

  private observeCourseField(): void {
    const courseNameField = this.courses.at(this.courses.length - 1).get('courseName');
    if (courseNameField){
      this.filteredOptions = courseNameField.valueChanges
        .pipe(
          startWith(''),
          map((value) => typeof value === 'string' ? value : value.name),
          map((name) => name ? this._filter(name) : this.courseOptions.slice())
        );
    }
  }
}
