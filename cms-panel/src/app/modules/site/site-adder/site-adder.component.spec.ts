import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteAdderComponent } from './site-adder.component';

describe('SiteAdderComponent', () => {
  let component: SiteAdderComponent;
  let fixture: ComponentFixture<SiteAdderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SiteAdderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SiteAdderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
