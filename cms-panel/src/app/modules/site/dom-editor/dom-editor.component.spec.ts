import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DomEditorComponent } from './dom-editor.component';

describe('DomEditorComponent', () => {
  let component: DomEditorComponent;
  let fixture: ComponentFixture<DomEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DomEditorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DomEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
