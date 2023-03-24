import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TonesComponent } from './tones.component';

describe('TonesComponent', () => {
  let component: TonesComponent;
  let fixture: ComponentFixture<TonesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TonesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TonesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
