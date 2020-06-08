import { TestBed } from '@angular/core/testing';

import { ShowOnePostService } from './show-one-post.service';

describe('ShowOnePostService', () => {
  let service: ShowOnePostService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShowOnePostService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
