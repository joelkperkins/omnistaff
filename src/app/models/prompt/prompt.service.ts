import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { LocalStorageService } from '../local-storage.service';
import { PromptModel } from './prompt.model';
import { TonesModel } from '../tones/tones.model';
import {
  ChangeActivePrompt,
  ChangeTonePrompt,
  ChangeEmotionPrompt,
  ChangePersonaPrompt,
  ChangeGenrePrompt,
  ChangeTopicPrompt,
} from '../../state/prompt/prompt.actions';

@Injectable({
  providedIn: 'root',
})
export class PromptService {
  constructor(private store: Store, private local: LocalStorageService) {}

  getPrompts(): PromptModel[] {
    return this.local.getPrompts();
  }

  setActivePrompt(prompt: PromptModel): void {
    this.local.savePrompt(prompt);
    this.store.dispatch(new ChangeActivePrompt(prompt));
  }

  updatePrompt(prompt: PromptModel): void {
    this.local.savePrompt(prompt);
  }

  deletePrompt(id: number): void {
    this.local.deletePrompt(id);
  }

  resetPromptInputs(): void {
    this.store.dispatch(new ChangeActivePrompt(null));
    this.store.dispatch(new ChangeTonePrompt(null));
    this.store.dispatch(new ChangeEmotionPrompt(null));
    this.store.dispatch(new ChangePersonaPrompt(null));
    this.store.dispatch(new ChangeGenrePrompt(null));
    this.store.dispatch(new ChangeTopicPrompt(null));
  }

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
        return acc + ` ${curr.name} tone in your response to this prompt. `;
      }
      if (index !== tones.length - 1 && tones.length === 2) {
        return acc + ` ${curr.name}`;
      } else if (index !== tones.length - 1) {
        return acc + ` ${curr.name},`;
      } else {
        return acc + ` and ${curr.name} tone in your response to this prompt. `;
      }
    }, 'Please use a');
  }

  // setToneSentence(input: string): void {
  //   this.store.dispatch(new ChangeTonePrompt(input));
  // }

  setEmotionPrompt(emotions: any[], name: string): void {
    const emotionIds = emotions.map((emotion) => emotion.id);
    const emotionBody = this.buildEmotionSentence(emotions);
    const prompt = new PromptModel({
      body: emotionBody,
      descriptors: emotionIds,
      name,
    });

    this.store.dispatch(new ChangeEmotionPrompt(prompt));
  }

  buildEmotionSentence(emotions: any[]): string {
    return emotions.reduce((acc: any, curr: any, index: number) => {
      if (index === 0 && emotions.length === 1) {
        return acc + ` ${curr.name} as the emotional atmosphere. `;
      }
      if (index !== emotions.length - 1 && emotions.length === 2) {
        return acc + ` ${curr.name}`;
      } else if (index !== emotions.length - 1) {
        return acc + ` ${curr.name},`;
      } else {
        return acc + ` and ${curr.name} as the emotional atmosphere. `;
      }
    }, 'The response should express a sense of');
  }

  setPersonaPrompt(personas: any[], name: string): void {
    const personaIds = personas.map((persona) => persona.id);
    const personaBody = this.buildPersonaSentence(personas);
    const prompt = new PromptModel({
      body: personaBody,
      descriptors: personaIds,
      name,
    });

    this.store.dispatch(new ChangePersonaPrompt(prompt));
  }

  buildPersonaSentence(personas: any[]): string {
    return personas.reduce((acc: any, curr: any, index: number) => {
      if (index === 0 && personas.length === 1) {
        return acc + ` ${curr.name}. `;
      }
      if (index !== personas.length - 1 && personas.length === 2) {
        return acc + ` ${curr.name}`;
      } else if (index !== personas.length - 1) {
        return acc + ` ${curr.name},`;
      } else {
        return acc + ` and ${curr.name}. `;
      }
    }, 'When writing this response, please imagine your personality as');
  }

  setGenrePrompt(genres: any[], name: string): void {
    const genreIds = genres.map((genre) => genre.id);
    const genreBody = this.buildGenreSentence(genres);
    const prompt = new PromptModel({
      body: genreBody,
      descriptors: genreIds,
      name,
    });

    this.store.dispatch(new ChangeGenrePrompt(prompt));
  }

  buildGenreSentence(genres: any[]): string {
    return genres.reduce((acc: any, curr: any, index: number) => {
      if (index === 0 && genres.length === 1) {
        return acc + ` ${curr.name} article. `;
      }
      if (index !== genres.length - 1 && genres.length === 2) {
        return acc + ` ${curr.name}`;
      } else if (index !== genres.length - 1) {
        return acc + ` ${curr.name},`;
      } else {
        return acc + ` and ${curr.name} article. `;
      }
    }, 'The response should be written in the style of');
  }

  setTopicPrompt(topics: any[], name: string): void {
    const topicIds = topics.map((topic) => topic.id);
    const topicBody = this.buildTopicSentence(topics);
    const prompt = new PromptModel({
      body: topicBody,
      descriptors: topicIds,
      name,
    });

    this.store.dispatch(new ChangeTopicPrompt(prompt));
  }

  buildTopicSentence(topics: any[]): string {
    return topics.reduce((acc: any, curr: any, index: number) => {
      if (index === 0 && topics.length === 1) {
        return acc + ` ${curr.name}.`;
      }
      if (index !== topics.length - 1 && topics.length === 2) {
        return acc + ` ${curr.name}`;
      } else if (index !== topics.length - 1) {
        return acc + ` ${curr.name},`;
      } else {
        return acc + ` and ${curr.name}.`;
      }
    }, 'Ensure to focus on writing the response about');
  }
}
