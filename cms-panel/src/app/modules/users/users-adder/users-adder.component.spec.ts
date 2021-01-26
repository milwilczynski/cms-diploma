import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersAdderComponent } from './users-adder.component';

describe('UsersAdderComponent', () => {
  let component: UsersAdderComponent;
  let fixture: ComponentFixture<UsersAdderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsersAdderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersAdderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
