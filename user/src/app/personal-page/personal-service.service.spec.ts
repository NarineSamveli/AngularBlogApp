import { TestBed } from '@angular/core/testing';

import { PersonalServiceService } from './personal-service.service';

describe('PersonalServiceService', () => {
  let service: PersonalServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PersonalServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
