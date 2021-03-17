import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TitleShowComponent } from './title-show.component';

describe('TitleShowComponent', () => {
  let component: TitleShowComponent;
  let fixture: ComponentFixture<TitleShowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TitleShowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TitleShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
