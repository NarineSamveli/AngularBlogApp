import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowOnePostComponent } from './show-one-post.component';

describe('ShowOnePostComponent', () => {
  let component: ShowOnePostComponent;
  let fixture: ComponentFixture<ShowOnePostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowOnePostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowOnePostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
