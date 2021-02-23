import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseCreationComponent } from './course-creation.component';

describe('NewCourseCreationComponent', () => {
  let component: CourseCreationComponent;
  let fixture: ComponentFixture<CourseCreationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseCreationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
