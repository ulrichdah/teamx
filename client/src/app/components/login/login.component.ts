import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { LoginResult, UserLoginInfo } from '../../../../../common/communication/user-login-info';
import { LoginService } from '../../services/login.service';

const COOKIE_DURATION = 30;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  isPending: boolean;
  loginFailed: boolean;

  constructor(private fb: FormBuilder, private loginService: LoginService, private cookieService: CookieService,
    private router: Router) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.cookieService.deleteAll();
  }

  onSubmit(): void {
    this.isPending = true;
    this.loginFailed = false;

    this.loginService.login(this.loginForm.value as UserLoginInfo).subscribe((result: LoginResult) => {
      this.isPending = false;
      this.loginFailed = !result.isLoggedIn;

      if (result.isLoggedIn) {
        this.loginService.isLoggedIn = true;
        const expirationDate = new Date();
        expirationDate.setMinutes(expirationDate.getMinutes() + COOKIE_DURATION);
        this.cookieService.set('sessionId', result.sessionId, expirationDate);
        this.cookieService.set('username', this.loginForm.value.username, expirationDate);

        this.router.navigate(['home']);
      }
    });
  }

  isFieldInvalid(fieldName: string): boolean | null {
    const formField = this.loginForm.get(fieldName);
    return formField && formField.invalid && formField.errors && (formField.dirty || formField.touched);
  }
}
