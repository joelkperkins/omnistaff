import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DescriptorsIndexComponent } from './descriptors-index.component';

describe('DescriptorsIndexComponent', () => {
  let component: DescriptorsIndexComponent;
  let fixture: ComponentFixture<DescriptorsIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DescriptorsIndexComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DescriptorsIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
