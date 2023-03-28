import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivePromptComponent } from './active-prompt.component';

describe('ActivePromptComponent', () => {
  let component: ActivePromptComponent;
  let fixture: ComponentFixture<ActivePromptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActivePromptComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivePromptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
