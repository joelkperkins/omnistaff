import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';

import { PromptModel } from './prompt/prompt.model';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor(private store: Store) {}

  savePrompt(prompt: PromptModel): void {
    const prompts = localStorage.getItem('prompts');
    if (prompts) {
      const promptsData = JSON.parse(prompts);
      const promptKeys = Object.keys(promptsData);
      const id = promptKeys.length;
      prompt.id = id;
      promptsData[id] = prompt;
      localStorage.setItem('prompts', JSON.stringify(promptsData));
    } else {
      localStorage.setItem('prompts', JSON.stringify({ 0: prompt }));
    }
  }

  getPrompts(): PromptModel[] {
    const prompts = localStorage.getItem('prompts');
    if (prompts) {
      const promptsData = JSON.parse(prompts);
      const promptKeys = Object.keys(promptsData);
      const promptsArray = promptKeys.map((key) => promptsData[key]);
      return promptsArray;
    }
  }

  getPrompt(id: number): string {
    const prompts = localStorage.getItem('prompts');
    if (prompts) {
      const promptsData = JSON.parse(prompts);
      return promptsData[id];
    }
  }

  deletePrompt(id: number): void {
    const prompts = localStorage.getItem('prompts');
    if (prompts) {
      const promptsData = JSON.parse(prompts);
      delete promptsData[id];
      localStorage.setItem('prompts', JSON.stringify(promptsData));
    }
  }
}
