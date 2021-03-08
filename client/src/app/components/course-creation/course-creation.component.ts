import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CourseService } from 'src/app/services/course.service';

@Component({
  selector: 'app-course-creation',
  templateUrl: './course-creation.component.html',
  styleUrls: ['./course-creation.component.scss']
})
export class CourseCreationComponent implements OnInit {

  courseCreationForm: FormGroup;
  isPending: boolean = false;
  retryRequest: boolean = false;
  isExistingAcronym: Observable<boolean>;

  constructor (private fb: FormBuilder, private courseService: CourseService, private router: Router) {}

  ngOnInit(): void {
    this.courseCreationForm = this.fb.group({
      acronym:['', [Validators.required, Validators.pattern(new RegExp('^[A-Z]{3}[\\d]{4}[A-Z]{0,1}$'))]],
      title: ['', Validators.required]
    });
  }

  onAcronymChange(): void {
    this.isExistingAcronym = this.courseService.isExistingAcronym(this.courseCreationForm.get('acronym')?.value);
  }

  onSubmit(): void {
    this.isPending = true;
    this.courseService.addCourse(this.courseCreationForm.value).subscribe((success) => {
      this.isPending = false;
      this.retryRequest = !success;
      if (this.retryRequest) return;
      this.router.navigate(['/home']);
    });
  }

}
