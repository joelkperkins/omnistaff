import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromptPreviewTextAreaComponent } from './prompt-preview-text-area.component';

describe('PromptPreviewTextAreaComponent', () => {
  let component: PromptPreviewTextAreaComponent;
  let fixture: ComponentFixture<PromptPreviewTextAreaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PromptPreviewTextAreaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PromptPreviewTextAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
