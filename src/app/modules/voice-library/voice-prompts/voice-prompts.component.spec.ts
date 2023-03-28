import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoicePromptsComponent } from './voice-prompts.component';

describe('VoicePromptsComponent', () => {
  let component: VoicePromptsComponent;
  let fixture: ComponentFixture<VoicePromptsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VoicePromptsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VoicePromptsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
