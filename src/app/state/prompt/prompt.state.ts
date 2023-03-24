import { Injectable } from '@angular/core';
import { State, Action, StateContext, Store, Selector } from '@ngxs/store';
import { PromptModel } from '../../models/prompt/prompt.model';
import { AddPrompt, ChangeActivePrompt, RemovePrompt } from './prompt.actions';

interface IPromptState {
  prompts: PromptModel[];
  activePrompt: PromptModel;
}

@Injectable({
  providedIn: 'root',
})
@State<IPromptState>({
  name: 'prompt',
  defaults: {
    prompts: [],
    activePrompt: null,
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
}
