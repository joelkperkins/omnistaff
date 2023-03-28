import { Injectable } from '@angular/core';
import { State, Action, StateContext, Store, Selector } from '@ngxs/store';
import { PromptModel } from '../../models/prompt/prompt.model';
import {
  AddPrompt,
  ChangeActivePrompt,
  RemovePrompt,
  ChangeTonePrompt,
  ChangeEmotionPrompt,
  ChangePersonaPrompt,
  ChangeGenrePrompt,
  ChangeTopicPrompt,
} from './prompt.actions';

interface IPromptState {
  prompts: PromptModel[];
  activePrompt: PromptModel;
  tonePrompt: PromptModel;
  emotionPrompt: PromptModel;
  personaPrompt: PromptModel;
  genrePrompt: PromptModel;
  topicPrompt: PromptModel;
}

@Injectable({
  providedIn: 'root',
})
@State<IPromptState>({
  name: 'prompt',
  defaults: {
    prompts: [],
    activePrompt: null,
    tonePrompt: null,
    emotionPrompt: null,
    personaPrompt: null,
    genrePrompt: null,
    topicPrompt: null,
  },
})
export class PromptState {
  constructor(private store: Store) {}

  @Selector()
  static prompts(state: IPromptState): PromptModel[] {
    return state.prompts;
  }

  @Selector()
  static activePrompt(state: IPromptState): PromptModel {
    return state.activePrompt;
  }

  @Selector()
  static tonePrompt(state: IPromptState): PromptModel {
    return state.tonePrompt;
  }

  @Selector()
  static emotionPrompt(state: IPromptState): PromptModel {
    return state.emotionPrompt;
  }

  @Selector()
  static personaPrompt(state: IPromptState): PromptModel {
    return state.personaPrompt;
  }

  @Selector()
  static genrePrompt(state: IPromptState): PromptModel {
    return state.genrePrompt;
  }

  @Selector()
  static topicPrompt(state: IPromptState): PromptModel {
    return state.topicPrompt;
  }

  @Action(AddPrompt)
  addPrompt(ctx: StateContext<IPromptState>, action: AddPrompt): void {
    const state = ctx.getState();
    ctx.patchState({
      prompts: [...state.prompts, action.prompt],
    });
  }

  @Action(RemovePrompt)
  removePrompt(ctx: StateContext<IPromptState>, action: RemovePrompt): void {
    const state = ctx.getState();
    ctx.patchState({
      prompts: state.prompts.filter((prompt) => prompt.id !== action.prompt.id),
    });
  }

  @Action(ChangeActivePrompt)
  changeActivePrompt(
    ctx: StateContext<IPromptState>,
    action: ChangeActivePrompt
  ): void {
    ctx.patchState({
      activePrompt: action.prompt,
    });
  }

  @Action(ChangeTonePrompt)
  changeTonePrompt(
    ctx: StateContext<IPromptState>,
    action: ChangeTonePrompt
  ): void {
    ctx.patchState({
      tonePrompt: action.prompt,
    });
  }

  @Action(ChangeEmotionPrompt)
  changeEmotionPrompt(
    ctx: StateContext<IPromptState>,
    action: ChangeEmotionPrompt
  ): void {
    ctx.patchState({
      emotionPrompt: action.prompt,
    });
  }

  @Action(ChangePersonaPrompt)
  changePersonaPrompt(
    ctx: StateContext<IPromptState>,
    action: ChangePersonaPrompt
  ): void {
    ctx.patchState({
      personaPrompt: action.prompt,
    });
  }

  @Action(ChangeGenrePrompt)
  changeGenrePrompt(
    ctx: StateContext<IPromptState>,
    action: ChangeGenrePrompt
  ): void {
    ctx.patchState({
      genrePrompt: action.prompt,
    });
  }

  @Action(ChangeTopicPrompt)
  changeTopicPrompt(
    ctx: StateContext<IPromptState>,
    action: ChangeTopicPrompt
  ): void {
    ctx.patchState({
      topicPrompt: action.prompt,
    });
  }
}
