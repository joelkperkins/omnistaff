import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Store, Select } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';

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
  @Select(PromptState.activePrompt)
  activePrompt$: Observable<PromptModel>;

  @Select(TonesState.activeTones)
  activeTones$: Observable<TonesModel[]>;

  sub: Subscription = new Subscription();

  promptPreview = new FormGroup({
    body: new FormControl({ value: 'test', disabled: false }, []),
  });

  constructor(private promptService: PromptService) {}

  ngOnInit(): void {
    const sub1$ = this.activePrompt$.subscribe((prompt) => {
      console.log('prompt', prompt);
      if (prompt) {
        this.promptPreview.patchValue({
          body: prompt.body,
        });
      }
    });
    const sub2$ = this.activeTones$.subscribe((tones) => {
      if (tones.length > 0) {
        this.promptService.generatePrompt(tones, 'Sample Prompt');
      }
    });
    this.sub.add(sub1$);
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
