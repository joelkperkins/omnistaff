import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { PromptModel } from 'src/app/models/prompt/prompt.model';
import { PromptService } from 'src/app/models/prompt/prompt.service';
import { PromptState } from 'src/app/state/prompt/prompt.state';

@Component({
  selector: 'app-active-prompt',
  templateUrl: './active-prompt.component.html',
  styleUrls: ['./active-prompt.component.scss'],
})
export class ActivePromptComponent implements OnInit, OnDestroy {
  @Select(PromptState.activePrompt) activePrompt$: Observable<PromptModel>;

  form = new FormGroup({
    promptName: new FormControl('', [Validators.required]),
    promptBody: new FormControl('', [Validators.required]),
  });

  subscription$: Subscription = new Subscription();

  constructor(private prompt: PromptService) {}

  ngOnInit(): void {
    const sub$ = this.activePrompt$.subscribe((prompt) => {
      if (prompt) {
        this.form.patchValue({
          promptName: prompt.name,
          promptBody: prompt.body,
        });
      }
    });
    this.subscription$.add(sub$);
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }

  clearPrompt(): void {
    this.prompt.resetPromptInputs();
  }

  updatePrompt(): void {
    const sub$ = this.activePrompt$.subscribe((prompt) => {
      if (prompt) {
        const updatedPrompt: PromptModel = {
          name: this.form.get('promptName')?.value,
          body: this.form.get('promptBody')?.value,
          descriptors: prompt.descriptors,
        };
        this.prompt.updatePrompt(updatedPrompt);
      }
    });
    this.subscription$.add(sub$);
  }
}
