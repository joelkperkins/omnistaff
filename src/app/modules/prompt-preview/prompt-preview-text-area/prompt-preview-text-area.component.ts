import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Store, Select } from '@ngxs/store';
import { Observable, Subscription, combineLatest } from 'rxjs';

import { PromptModel } from '../../../models/prompt/prompt.model';
import { TonesModel } from '../../../models/tones/tones.model';

import { PromptState } from '../../../state/prompt/prompt.state';
import { TonesState } from '../../../state/tones/tones.state';

import { PromptService } from '../../../models/prompt/prompt.service';

@Component({
  selector: 'app-prompt-preview-text-area',
  templateUrl: './prompt-preview-text-area.component.html',
  styleUrls: ['./prompt-preview-text-area.component.scss'],
})
export class PromptPreviewTextAreaComponent implements OnInit, OnDestroy {
  @Select(PromptState.tonePrompt)
  tonePrompt$: Observable<PromptModel>;

  @Select(PromptState.emotionPrompt)
  emotionPrompt$: Observable<PromptModel>;

  @Select(PromptState.personaPrompt)
  personaPrompt$: Observable<PromptModel>;

  @Select(PromptState.genrePrompt)
  genrePrompt$: Observable<PromptModel>;

  @Select(PromptState.topicPrompt)
  topicPrompt$: Observable<PromptModel>;

  @Select(TonesState.activeTones)
  activeTones$: Observable<TonesModel[]>;

  sub: Subscription = new Subscription();

  promptPreview = new FormGroup({
    tone: new FormControl({ value: null, disabled: false }, []),
    emotion: new FormControl({ value: null, disabled: false }, []),
    persona: new FormControl({ value: null, disabled: false }, []),
    genre: new FormControl({ value: null, disabled: false }, []),
    topic: new FormControl({ value: null, disabled: false }, []),
  });

  constructor(private promptService: PromptService) {}

  ngOnInit(): void {
    const sub1$ = combineLatest([
      this.tonePrompt$,
      this.emotionPrompt$,
      this.personaPrompt$,
      this.genrePrompt$,
      this.topicPrompt$,
      this.activeTones$,
    ]).subscribe(
      ([
        tonePrompt,
        emotionPrompt,
        personaPrompt,
        genrePrompt,
        topicPrompt,
      ]) => {
        if (tonePrompt) {
          this.promptPreview.patchValue({
            tone: tonePrompt.body,
          });
        }
        if (emotionPrompt) {
          this.promptPreview.patchValue({
            emotion: emotionPrompt.body,
          });
        }
        if (personaPrompt) {
          this.promptPreview.patchValue({
            persona: personaPrompt.body,
          });
        }
        if (genrePrompt) {
          this.promptPreview.patchValue({
            genre: genrePrompt.body,
          });
        }
        if (topicPrompt) {
          this.promptPreview.patchValue({
            topic: topicPrompt.body,
          });
        }
      }
    );
    this.sub.add(sub1$);

    // subscribe to tones and set prompt statements
    const sub2$ = this.activeTones$.subscribe((tones) => {
      if (tones.length > 0) {
        this.promptService.setTonePromt(tones, 'Tone Prompt');
      }
    });
    this.sub.add(sub2$);
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
