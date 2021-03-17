import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockShowComponent } from './block-show.component';

describe('BlockShowComponent', () => {
  let component: BlockShowComponent;
  let fixture: ComponentFixture<BlockShowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlockShowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlockShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
