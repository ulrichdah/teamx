import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CourseListComponent } from './components/course-list/course-list.component';
import { LoginComponent } from './components/login/login.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { NewCourseCreationComponent } from './components/new-course-creation/new-course-creation.component';
import { UserRegistrationComponent } from './components/user-registration/user-registration.component';
import { AuthGuardService } from './services/auth-guard.service';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full'},
  { path: 'login', component: LoginComponent },
  { path: 'registration', component: UserRegistrationComponent },
  { path: 'home', component: MainPageComponent, canActivate: [AuthGuardService] },
  { path: 'course-list/:courseId', component: CourseListComponent },
  { path: 'course-creation', component: NewCourseCreationComponent },
  { path: '**', redirectTo: '/home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
