import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromptPreviewIndexComponent } from './prompt-preview-index.component';

describe('PromptPreviewIndexComponent', () => {
  let component: PromptPreviewIndexComponent;
  let fixture: ComponentFixture<PromptPreviewIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PromptPreviewIndexComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PromptPreviewIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
