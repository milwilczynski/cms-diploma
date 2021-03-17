import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostsbysiteComponent } from './postsbysite.component';

describe('PostsbysiteComponent', () => {
  let component: PostsbysiteComponent;
  let fixture: ComponentFixture<PostsbysiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostsbysiteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostsbysiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
