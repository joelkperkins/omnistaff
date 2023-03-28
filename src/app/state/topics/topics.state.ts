import { Injectable } from '@angular/core';
import { State, Action, StateContext, Store, Selector } from '@ngxs/store';
import { TopicsModel } from '../../models/topics/topics.model';

import {
  ChangeInactiveTopics,
  UpdateActiveTopics,
  UpdateInactiveTopics,
  ResetTopics,
} from './topics.actions';

interface ITopicsState {
  activeTopics: TopicsModel[];
  inactiveTopics: TopicsModel[];
}

@Injectable({
  providedIn: 'root',
})
@State<ITopicsState>({
  name: 'topics',
  defaults: {
    activeTopics: [],
    inactiveTopics: [],
  },
})
export class TopicsState {
  constructor(private store: Store) {}

  @Selector()
  static activeTopics(state: ITopicsState): TopicsModel[] {
    return state.activeTopics;
  }

  @Selector()
  static inactiveTopics(state: ITopicsState): TopicsModel[] {
    return state.inactiveTopics;
  }

  @Action(ChangeInactiveTopics)
  changeInactiveTopics(
    ctx: StateContext<ITopicsState>,
    action: ChangeInactiveTopics
  ): void {
    ctx.patchState({
      inactiveTopics: action.topics,
    });
  }

  @Action(UpdateActiveTopics)
  updateActiveTopics(
    { patchState, getState }: StateContext<ITopicsState>,
    { topic }: UpdateActiveTopics
  ): void {
    const { activeTopics, inactiveTopics } = getState();

    const newActiveTopics = [...activeTopics, topic];
    const newInactiveTopics = inactiveTopics.filter(
      (item) => item.name !== topic.name
    );

    patchState({
      activeTopics: newActiveTopics,
      inactiveTopics: newInactiveTopics,
    });
  }

  @Action(UpdateInactiveTopics)
  updateInactiveTopics(
    { patchState, getState }: StateContext<ITopicsState>,
    { topic }: UpdateInactiveTopics
  ): void {
    const { activeTopics, inactiveTopics } = getState();

    const newActiveTopics = activeTopics.filter(
      (item) => item.name !== topic.name
    );
    const newInactiveTopics = [...inactiveTopics, topic];

    patchState({
      activeTopics: newActiveTopics,
      inactiveTopics: newInactiveTopics,
    });
  }

  @Action(ResetTopics)
  resetTopics(ctx: StateContext<ITopicsState>): void {
    ctx.patchState({
      activeTopics: [],
      inactiveTopics: [],
    });
  }
}
