import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginResult, UserLoginInfo } from '../../../../../common/communication/user-login-info';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  isPending: boolean;
  loginFailed: boolean;
  hidePassword:boolean;

  constructor(private fb: FormBuilder, private loginService: LoginService, private router: Router) {
      this.hidePassword = true;
    }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    this.isPending = true;
    this.loginFailed = false;

    this.loginService.login(this.loginForm.value as UserLoginInfo).subscribe((result: LoginResult) => {
      this.isPending = false;
      this.loginFailed = !result.isLoggedIn;

      if (result.isLoggedIn) {
        this.loginService.setLoginState(result);

        this.router.navigate(['home']);
      }
    });
  }

  isFieldInvalid(fieldName: string): boolean | null {
    const formField = this.loginForm.get(fieldName);
    return formField && formField.invalid && formField.errors && (formField.dirty || formField.touched);
  }
}
