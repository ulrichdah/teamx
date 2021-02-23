import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CourseViewComponent } from './components/course-view/course-view.component';
import { LoginComponent } from './components/login/login.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { NewCourseCreationComponent } from './components/new-course-creation/new-course-creation.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { UserRegistrationComponent } from './components/user-registration/user-registration.component';
import { AuthGuardService } from './services/auth-guard.service';
import { CanDeactivateGuardService } from './services/can-deactivate-guard.service';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full'},
  { path: 'login', component: LoginComponent },
  { path: 'registration', component: UserRegistrationComponent },
  { path: 'user-profile/:username', component: UserProfileComponent, canActivate: [AuthGuardService], canDeactivate: [CanDeactivateGuardService] },
  { path: 'home', component: MainPageComponent, canActivate: [AuthGuardService] },
  { path: 'course-list/:courseId', component: CourseViewComponent },
  { path: 'course-creation', component: NewCourseCreationComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
