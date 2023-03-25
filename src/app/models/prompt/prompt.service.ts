import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { PromptModel } from './prompt.model';
import { TonesModel } from '../tones/tones.model';
import {
  ChangeActivePrompt,
  ChangeTonePrompt,
} from '../../state/prompt/prompt.actions';

@Injectable({
  providedIn: 'root',
})
export class PromptService {
  constructor(private store: Store) {}

  setTonePromt(tones: TonesModel[], name: string): void {
    const toneIds = tones.map((tone) => tone.id);
    const toneBody = this.buildToneSentence(tones);
    const prompt = new PromptModel({
      body: toneBody,
      descriptors: toneIds,
      name,
    });

    this.store.dispatch(new ChangeTonePrompt(prompt));
  }

  buildToneSentence(tones: TonesModel[]): string {
    return tones.reduce((acc: any, curr: any, index: number) => {
      if (index === 0 && tones.length === 1) {
        return acc + ` ${curr.name} tone in your response to this prompt.`;
      }
      if (index !== tones.length - 1 && tones.length === 2) {
        return acc + ` ${curr.name}`;
      } else if (index !== tones.length - 1) {
        return acc + ` ${curr.name},`;
      } else {
        return acc + ` and ${curr.name} tone in your response to this prompt.`;
      }
    }, 'Please use a');
  }
}
