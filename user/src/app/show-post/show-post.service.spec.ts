import { TestBed } from '@angular/core/testing';

import { ShowPostService } from './show-post.service';

describe('ShowPostService', () => {
  let service: ShowPostService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShowPostService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
