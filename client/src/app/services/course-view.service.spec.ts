import { TestBed } from '@angular/core/testing';

import { CourseViewService } from './course-view.service';

describe('CourseService', () => {
  let service: CourseViewService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CourseViewService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
