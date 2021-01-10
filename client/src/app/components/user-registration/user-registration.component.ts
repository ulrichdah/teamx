import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { AccountType, MAX_PASSWORD_LENGTH, MAX_USERNAME_LENGTH, MIN_PASSWORD_LENGTH, MIN_USERNAME_LENGTH } from 'src/app/classes/constants';
import { Student } from 'src/app/classes/course';

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
      accountType:['', Validators.required],
      teamName: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      username: ['', [Validators.required, Validators.minLength(MIN_USERNAME_LENGTH), Validators.maxLength(MAX_USERNAME_LENGTH)]],
      password: ['', [Validators.required, Validators.minLength(MIN_PASSWORD_LENGTH), Validators.maxLength(MAX_PASSWORD_LENGTH)]],
      confirmPassword: ['', [Validators.required,  Validators.minLength(MIN_PASSWORD_LENGTH), Validators.maxLength(MAX_PASSWORD_LENGTH)]],
      email: ['', [Validators.required, Validators.email]],
      facebook: [''],
      courses: this.fb.array([this.fb.group({
        courseName:['', Validators.required],
        experiences:[''],
        goals:['', Validators.required],
        grade:[''],
        availabilities:[''],
      })])
    });
    this.observeCourseField();
  }

  get courses(): FormArray {
    return this.registrationForm.get('courses') as FormArray;
  }

  onSelectionChange(value: string): void {
    if (value === this.accounts[0]) {
      this.registrationForm.removeControl('teamName');
      this.registrationForm.addControl('firstName', new FormControl('', Validators.required));
      this.registrationForm.addControl('lastName', new FormControl('', Validators.required));
    } else {
      this.registrationForm.removeControl('firstName');
      this.registrationForm.removeControl('lastName');
      this.registrationForm.addControl('teamName', new FormControl('', Validators.required));
    }
  }

  onSubmit(): void {
    const toto: Student = this.registrationForm.value as Student;
    console.log(toto);
  }

  addCourse(): void {
    this.courses.push(this.fb.group({
      courseName:['', Validators.required],
      experiences:[''],
      goals:['', Validators.required],
      grade:[''],
      availabilities:[''],
    }));
  }

  deleteCourse(index: number): void {
    this.courses.removeAt(index);
  }

  displayFn(course: string): string {
    return course && course ? course : '';
  }

  isFieldInvalid(fieldName: string, subFieldName?: string, index?: number): boolean | null {
    const formField = subFieldName && index != undefined ? this.courses.at(index).get(subFieldName) : this.registrationForm.get(fieldName);
    return formField && formField.invalid && formField.errors && (formField.dirty || formField.touched);
  }

  isLengthInvalid(fieldName: string): boolean {
    const formField = this.registrationForm.get(fieldName);
    return formField && formField.errors && (formField.errors.minlength || formField.errors.maxlength);
  }

  isPasswordConfirmed(): boolean | null {
    const passwordField = this.registrationForm.get('password');
    const confirmPasswordField = this.registrationForm.get('confirmPassword');
    return passwordField && confirmPasswordField &&
    (passwordField.touched || passwordField.dirty) && (confirmPasswordField.touched || confirmPasswordField.dirty) &&
    passwordField.value === confirmPasswordField.value;
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
