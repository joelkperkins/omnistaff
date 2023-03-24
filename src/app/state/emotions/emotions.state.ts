import { Injectable } from '@angular/core';
import { State, Action, StateContext, Store, Selector } from '@ngxs/store';
import { EmotionsModel } from '../../models/emotions/emotions.model';

import {
  ChangeActiveCategory,
  UpdateActiveEmotions,
  UpdateInactiveEmotions,
  ChangeInactiveEmotions,
} from './emotions.actions';

export enum EmotionsCategory {
  JOY = 'Joy',
  GRIEF = 'Grief',
  FRUSTRATION = 'Frustration',
  SURPRISE = 'Surprise',
  CONTEMP = 'Contempt',
  ANTICIPATION = 'Anticipation',
  JEALOUSY = 'Jealousy',
  EMPATHY = 'Empathy',
  CURIOSITY = 'Curiosity',
}

interface IEmotionsState {
  activeEmotions: EmotionsModel[];
  inactiveEmotions: EmotionsModel[];
  activeCategory: EmotionsCategory;
}

@Injectable({
  providedIn: 'root',
})
@State<IEmotionsState>({
  name: 'tones',
  defaults: {
    activeEmotions: [],
    inactiveEmotions: [],
    activeCategory: EmotionsCategory.JOY,
  },
})
export class TonesState {
  constructor(private store: Store) {}

  @Selector()
  static activeEmotions(state: IEmotionsState): EmotionsModel[] {
    return state.activeEmotions;
  }

  @Selector()
  static inactiveTones(state: IEmotionsState): EmotionsModel[] {
    return state.inactiveEmotions;
  }

  @Selector()
  static activeCategory(state: IEmotionsState): EmotionsCategory {
    return state.activeCategory;
  }

  @Action(ChangeInactiveEmotions)
  changeInactiveEmotions(
    ctx: StateContext<IEmotionsState>,
    action: ChangeInactiveEmotions
  ): void {
    ctx.patchState({
      inactiveEmotions: action.emotions,
    });
  }

  @Action(ChangeActiveCategory)
  changeActiveCategory(
    ctx: StateContext<IEmotionsState>,
    action: ChangeActiveCategory
  ): void {
    ctx.patchState({
      activeCategory: action.activeCategory,
    });
  }

  @Action(UpdateActiveEmotions)
  updateActiveEmotions(
    ctx: StateContext<IEmotionsState>,
    action: UpdateActiveEmotions
  ): void {
    if (action.emotion) {
      const state = ctx.getState();
      const activeEmotions: EmotionsModel[] = [
        action.emotion,
        ...state.activeEmotions,
      ];
      const inactiveEmotions: EmotionsModel[] = [
        ...state.inactiveEmotions,
      ].filter((emotion) => emotion.id !== action.emotion.id);
      ctx.patchState({
        activeEmotions,
        inactiveEmotions,
      });
    }
  }

  @Action(UpdateInactiveEmotions)
  updateInactiveEmotions(
    ctx: StateContext<IEmotionsState>,
    action: UpdateInactiveEmotions
  ): void {
    if (action.emotion) {
      const state = ctx.getState();
      const inactiveEmotions: EmotionsModel[] = [
        action.emotion,
        ...state.inactiveEmotions,
      ];
      const activeEmotions: EmotionsModel[] = [...state.activeEmotions].filter(
        (emotion) => emotion.id !== action.emotion.id
      );
      ctx.patchState({
        activeEmotions,
        inactiveEmotions,
      });
    }
  }
}
