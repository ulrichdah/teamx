import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountType } from 'src/app/classes/constants';
import { UserFormHandler } from '../../classes/user-form-handler';
import { UserRegistrationService } from '../../services/user-registration.service';

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.scss']
})
export class UserRegistrationComponent implements OnInit {

  accounts: string[] = [AccountType.ALONE, AccountType.INCOMPLETE_TEAM];
  registrationFormHandler: UserFormHandler;
  photoName: string = '(Vide)';

  constructor(private fb: FormBuilder, private userRegistrationService: UserRegistrationService, private router: Router) {}

  ngOnInit(): void {
    this.registrationFormHandler = new UserFormHandler(this.fb);
  }

  handleFileInput(files: FileList): void {
    this.photoName = files[0].name;
    const reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = () => {
      this.registrationFormHandler.form.get('userPhoto')?.setValue(reader.result?.toString());
    };
    reader.onerror = (error) => {
      console.error('Error: ', error);
    };
  }

  onUsernameChange(): void {
    this.registrationFormHandler.isExistingUsername =
    this.userRegistrationService.isExistingUsername(this.registrationFormHandler.form.get('username')?.value);
  }

  onSelectionChange(value: string): void {
    this.registrationFormHandler.accountTypeState(value);
  }

  onSubmit(): void {
    this.registrationFormHandler.retryRequest = false;
    this.registrationFormHandler.isPending = true;
    const newUser = this.registrationFormHandler.form.value;
    delete newUser.confirmPassword;
    this.userRegistrationService.addUser(newUser).subscribe((success: boolean) => {
      this.registrationFormHandler.isPending = false;
      if (success) {
        this.router.navigate(['/login']);
      } else {
        this.onUsernameChange();
        this.registrationFormHandler.retryRequest = true;
      }
    });
  }

  displayFn(course: string): string {
    return course && course ? course : '';
  }
}
