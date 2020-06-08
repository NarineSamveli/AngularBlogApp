import { TestBed } from '@angular/core/testing';

import { ShowAllPostsService } from './show-all-posts.service';

describe('ShowAllPostsService', () => {
  let service: ShowAllPostsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShowAllPostsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
