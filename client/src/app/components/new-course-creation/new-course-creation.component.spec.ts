import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewCourseCreationComponent } from './new-course-creation.component';

describe('NewCourseCreationComponent', () => {
  let component: NewCourseCreationComponent;
  let fixture: ComponentFixture<NewCourseCreationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewCourseCreationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewCourseCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
