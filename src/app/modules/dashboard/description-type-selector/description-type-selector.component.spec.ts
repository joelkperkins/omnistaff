import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DescriptionTypeSelectorComponent } from './description-type-selector.component';

describe('DescriptionTypeSelectorComponent', () => {
  let component: DescriptionTypeSelectorComponent;
  let fixture: ComponentFixture<DescriptionTypeSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DescriptionTypeSelectorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DescriptionTypeSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
