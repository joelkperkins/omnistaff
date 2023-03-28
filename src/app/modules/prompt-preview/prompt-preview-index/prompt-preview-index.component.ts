import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, Subscription, combineLatest } from 'rxjs';
import { Store, Select } from '@ngxs/store';

import { PromptModel } from '../../../models/prompt/prompt.model';
import { PromptService } from '../../../models/prompt/prompt.service';
import { PromptState } from '../../../state/prompt/prompt.state';

@Component({
  selector: 'app-prompt-preview-index',
  templateUrl: './prompt-preview-index.component.html',
  styleUrls: ['./prompt-preview-index.component.scss'],
})
export class PromptPreviewIndexComponent implements OnInit, OnDestroy {
  @Select(PromptState.activePrompt) activePrompt$: Observable<PromptModel>;
  @Select(PromptState.tonePrompt) tonePrompt$: Observable<PromptModel>;
  @Select(PromptState.emotionPrompt) emotionPrompt$: Observable<PromptModel>;
  @Select(PromptState.personaPrompt) personaPrompt$: Observable<PromptModel>;
  @Select(PromptState.genrePrompt) genrePrompt$: Observable<PromptModel>;
  @Select(PromptState.topicPrompt) topicPrompt$: Observable<PromptModel>;

  form = new FormGroup({
    promptName: new FormControl('', [Validators.required]),
    showName: new FormControl(true, [Validators.required]),
  });

  allowSave = true;
  showName = true;

  sub$: Subscription = new Subscription();

  constructor(private promptService: PromptService) {}

  ngOnInit(): void {
    this.activePrompt$.subscribe((prompt) => {
      if (prompt === null) {
        this.showName = true;
      } else {
        this.showName = false;
      }
    });
  }

  ngOnDestroy(): void {
    this.sub$.unsubscribe();
  }

  generatePrompt(): void {
    const promptName = this.form.get('promptName')?.value;
    const sub$ = combineLatest([
      this.tonePrompt$,
      this.emotionPrompt$,
      this.personaPrompt$,
      this.genrePrompt$,
      this.topicPrompt$,
    ]).subscribe((descriptors) => {
      const newPrompt: PromptModel = {
        name: promptName,
        body: '',
        descriptors: [],
      };
      const prompt: PromptModel = descriptors.reduce((acc, curr) => {
        if (curr && curr.body) {
          acc.body += curr.body;
          acc.descriptors = [...acc.descriptors, ...curr.descriptors];
        }
        return acc;
      }, newPrompt);
      const promptModel = new PromptModel(prompt);
      this.promptService.setActivePrompt(promptModel);
    });
    this.sub$.add(sub$);
  }
}
