import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentsByPostsComponent } from './comments-by-posts.component';

describe('CommentsByPostsComponent', () => {
  let component: CommentsByPostsComponent;
  let fixture: ComponentFixture<CommentsByPostsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommentsByPostsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentsByPostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
