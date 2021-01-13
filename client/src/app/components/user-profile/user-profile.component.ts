import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AccountType } from 'src/app/classes/constants';
import { UserFormHandler } from 'src/app/classes/user-form-handler';
import { User } from '../../../../../common/communication/users';
import { UserProfileService } from '../../services/user-profile.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  userFormHandler: UserFormHandler;
  initUserInfo: User;
  photo: string | undefined;
  isEditing: boolean;
  accounts: string[] = [AccountType.ALONE, AccountType.INCOMPLETE_TEAM];

  constructor(private route: ActivatedRoute, private userProfileService: UserProfileService, private fb: FormBuilder) { }

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

  enableEditing(): void {
    this.userFormHandler.form.enable();
    this.isEditing = true;
  }

  disableEditing(): void {
    this.userFormHandler.form.disable();
    this.isEditing = false;
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
    console.log(this.userFormHandler.form.value);
  }

  onCancel(): void {
    this.userFormHandler.initUserForm(this.initUserInfo);
    this.photo = this.initUserInfo.userPhoto ? this.initUserInfo.userPhoto : '';
    this.disableEditing();
  }

}
