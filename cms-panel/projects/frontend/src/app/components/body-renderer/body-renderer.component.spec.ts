import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BodyRendererComponent } from './body-renderer.component';

describe('BodyRendererComponent', () => {
  let component: BodyRendererComponent;
  let fixture: ComponentFixture<BodyRendererComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BodyRendererComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BodyRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
