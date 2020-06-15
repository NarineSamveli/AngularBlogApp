import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowAllPostsComponent } from './show-all-posts.component';

describe('ShowAllPostsComponent', () => {
  let component: ShowAllPostsComponent;
  let fixture: ComponentFixture<ShowAllPostsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowAllPostsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowAllPostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
