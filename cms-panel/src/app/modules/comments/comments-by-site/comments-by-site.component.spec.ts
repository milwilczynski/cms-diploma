import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentsBySiteComponent } from './comments-by-site.component';

describe('CommentsBySiteComponent', () => {
  let component: CommentsBySiteComponent;
  let fixture: ComponentFixture<CommentsBySiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommentsBySiteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentsBySiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
