import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { AccountType, MAX_PASSWORD_LENGTH, MAX_USERNAME_LENGTH, MIN_PASSWORD_LENGTH, MIN_USERNAME_LENGTH } from 'src/app/classes/constants';
import { User, UserCourse } from '../../../../common/communication/users';

export class UserFormHandler {

    form: FormGroup;
    acronyms: string[] = [
        'LOG2990',
        'INF1600',
        'INF1995'
    ];
    isExistingUsername: Observable<boolean>;
    hidePassword: boolean = true;
    isPending: boolean = false;
    retryRequest: boolean = false;

    constructor (private fb: FormBuilder) {
        this.form = this.fb.group({
            accountType:['', Validators.required],
            teamName: ['', Validators.required],
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            userPhoto: [''],
            username: ['', [Validators.required, Validators.minLength(MIN_USERNAME_LENGTH), Validators.maxLength(MAX_USERNAME_LENGTH)]],
            password: ['', [Validators.required, Validators.minLength(MIN_PASSWORD_LENGTH), Validators.maxLength(MAX_PASSWORD_LENGTH)]],
            confirmPassword: ['', [Validators.required,  Validators.minLength(MIN_PASSWORD_LENGTH), Validators.maxLength(MAX_PASSWORD_LENGTH)]],
            email: ['', [Validators.required, Validators.email]],
            facebook: [''],
            courses: this.fb.array([this.fb.group({
                acronym:['', Validators.required],
                experiences:[''],
                goals:['', Validators.required],
                grade:[''],
                availabilities:[''],
            })])
          });
    }

    get courses(): FormArray {
        return this.form.get('courses') as FormArray;
    }

    initUserForm(user: User): void {
        this.form.get('accountType')?.setValue(user.accountType);
        this.form.get('teamName')?.setValue(user.teamName);
        this.form.get('firstName')?.setValue(user.firstName);
        this.form.get('lastName')?.setValue(user.lastName);
        this.form.get('username')?.setValue(user.username);
        this.form.get('userPhoto')?.setValue(user.userPhoto);
        this.form.get('password')?.setValue(user.password);
        this.form.get('confirmPassword')?.setValue(user.password);
        this.form.get('email')?.setValue(user.email);
        this.form.get('facebook')?.setValue(user.facebook);
        this.addExistingCourses(user.courses);
        this.accountTypeState(user.accountType);
    }

    accountTypeState(accountType: string): void {
        if (accountType === AccountType.ALONE) {
            this.form.removeControl('teamName');
            this.form.addControl('firstName', new FormControl('', Validators.required));
            this.form.addControl('lastName', new FormControl('', Validators.required));
        } else {
            this.form.removeControl('firstName');
            this.form.removeControl('lastName');
            this.form.addControl('teamName', new FormControl('', Validators.required));
        }
    }

    addCourse(course?: UserCourse): void {
        this.courses.push(this.fb.group({
            acronym:[course ? course.acronym : '', Validators.required],
            experiences:[course ? course.experiences : ''],
            goals:[course ? course.goals : '', Validators.required],
            grade:[course ? course.grade : ''],
            availabilities:[course ? course.availabilities : ''],
        }));
    }

    deleteCourse(index: number): void {
        this.courses.removeAt(index);
    }

    isFieldInvalid(fieldName: string, subFieldName?: string, index?: number): boolean | null {
        const formField = subFieldName && index != undefined ? this.courses.at(index).get(subFieldName) : this.form.get(fieldName);
        return formField && formField.invalid && formField.errors && (formField.dirty || formField.touched);
    }

    isLengthInvalid(fieldName: string): boolean {
        const formField = this.form.get(fieldName);
        return formField && formField.errors && (formField.errors.minlength || formField.errors.maxlength);
    }

    isPasswordConfirmed(): boolean | null {
        const passwordField = this.form.get('password');
        const confirmPasswordField = this.form.get('confirmPassword');
        return passwordField && confirmPasswordField && passwordField.value === confirmPasswordField.value;
    }

    isFormInvalid(): boolean {
        return this.form.invalid || !this.isPasswordConfirmed();
    }

    displayFn(course: string): string {
        return course && course ? course : '';
    }

    private addExistingCourses(courses: UserCourse[]): void {
        this.courses.clear();
        for (const course of courses) {
            this.addCourse(course);
        }
    }
}