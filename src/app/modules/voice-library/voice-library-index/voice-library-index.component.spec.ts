import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoiceLibraryIndexComponent } from './voice-library-index.component';

describe('VoiceLibraryIndexComponent', () => {
  let component: VoiceLibraryIndexComponent;
  let fixture: ComponentFixture<VoiceLibraryIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VoiceLibraryIndexComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VoiceLibraryIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
