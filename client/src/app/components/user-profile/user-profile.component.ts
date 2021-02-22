import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AccountType } from 'src/app/classes/constants';
import { UserFormHandler } from 'src/app/classes/user-form-handler';
import { LoginService } from 'src/app/services/login.service';
import { User } from '../../../../../common/communication/users';
import { ComponentCanDeactivate } from '../../classes/component-can-deactivate';
import { UserProfileService } from '../../services/user-profile.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent extends ComponentCanDeactivate implements OnInit {

  userFormHandler: UserFormHandler;
  initUserInfo: User;
  photo: string | undefined;
  isEditing: boolean;
  accounts: string[] = [AccountType.ALONE, AccountType.INCOMPLETE_TEAM];

  constructor(private route: ActivatedRoute, private userProfileService: UserProfileService,
    private fb: FormBuilder, private loginService: LoginService) {
    super();
  }

  ngOnInit(): void {
    this.userFormHandler = new UserFormHandler(this.fb);
    const username = this.route.snapshot.paramMap.get('username');
    if (!username) return;

    this.userProfileService.getUser(username).subscribe((user: User) => {
      if (!user) return;
      this.userFormHandler.initUserForm(user);
      this.photo = user.userPhoto ? user.userPhoto : '';
      this.initUserInfo = user;
      this.disableEditing();
    });
  }

  canDeactivate(): boolean {
    return this.initUserInfo.userPhoto === this.photo && !this.userFormHandler.form.dirty;
  }

  @HostListener('window:beforeunload', ['$event'])
  // tslint:disable-next-line:no-any
  unloadNotification($event: any): void {
      if (!this.canDeactivate()) {
          $event.returnValue = true;
      }
  }

  enableEditing(): void {
    this.userFormHandler.form.enable();
    this.isEditing = true;
  }

  onFileUpload(files: FileList): void {
    this.enableEditing();
    const reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = () => {
      this.userFormHandler.form.get('userPhoto')?.setValue(reader.result?.toString());
      this.photo = reader.result?.toString();
    };
    reader.onerror = (error) => {
      console.error('Error: ', error);
    };
  }

  onSelectionChange(value: string): void {
    this.userFormHandler.accountTypeState(value);
  }

  onSubmit(): void {
    delete this.userFormHandler.form.value.confirmPassword;
    const updatedUser: User =  this.userFormHandler.form.value;
    updatedUser._id = this.loginService.loginResult.sessionId;
    this.userFormHandler.isPending = true;
    this.userProfileService.updateInfo(updatedUser).subscribe((success: boolean) => {
      this.userFormHandler.isPending = false;
      this.userFormHandler.retryRequest = !success;
      if (success){
        this.initUserInfo = this.userFormHandler.form.value;
        this.userFormHandler.form.reset();
        this.userFormHandler.initUserForm(this.initUserInfo);
        this.disableEditing();
      }
    });
  }

  onCancel(): void {
    this.userFormHandler.form.reset();
    this.userFormHandler.initUserForm(this.initUserInfo);
    this.photo = this.initUserInfo.userPhoto ? this.initUserInfo.userPhoto : '';
    this.disableEditing();
  }

  private disableEditing(): void {
    this.userFormHandler.form.disable();
    this.isEditing = false;
  }
}
