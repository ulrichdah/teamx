import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {MatSelectModule} from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './components/app/app.component';
import { CourseCreationComponent } from './components/course-creation/course-creation.component';
import { CourseViewComponent } from './components/course-view/course-view.component';
import { LoginComponent } from './components/login/login.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { ToolBarComponent } from './components/tool-bar/tool-bar.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { UserRegistrationComponent } from './components/user-registration/user-registration.component';
import { AuthGuardService } from './services/auth-guard.service';
import { CanDeactivateGuardService } from './services/can-deactivate-guard.service';

@NgModule({
    declarations: [
        AppComponent,
        MainPageComponent,
        CourseCreationComponent,
        CourseViewComponent,
        LoginComponent,
        UserRegistrationComponent,
        ToolBarComponent,
        UserProfileComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        AppRoutingModule,
        FormsModule,
        MatButtonModule,
        MatInputModule,
        MatIconModule,
        MatCardModule,
        FlexLayoutModule,
        MatToolbarModule,
        MatTabsModule,
        MatFormFieldModule,
        MatAutocompleteModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        MatSelectModule,
        MatDividerModule,
        MatProgressSpinnerModule,
        MatMenuModule,
    ],
    providers: [AuthGuardService, CanDeactivateGuardService],
    bootstrap: [AppComponent],
})
export class AppModule { }
