import { Injectable } from '@angular/core';
import { State, Action, StateContext, Store, Selector } from '@ngxs/store';
import { TonesModel } from '../../models/tones/tones.model';
import {
  ChangeActiveTones,
  ChangeInactiveTones,
  ChangeActiveCategory,
  UpdateActiveTones,
  UpdateInactiveTones,
} from './tones.actions';

export enum TonesCategory {
  PROFESSIONALISM = 'Professionalism',
  EMPATHY = 'Empathy',
  PLAYFULNESS = 'Playfulness',
  INTROSPECTION = 'Introspection',
  CONFIDENCE = 'Confidence',
  CURIOSITY = 'Curiosity',
  AFFECTION = 'Affection',
  RESPECT = 'Respect',
  CASUAL = 'Casual',
  NEGATIVITY = 'Negativity',
}

interface ITonesState {
  activeTones: TonesModel[];
  inactiveTones: TonesModel[];
  activeCategory: TonesCategory;
}

@Injectable({
  providedIn: 'root',
})
@State<ITonesState>({
  name: 'tones',
  defaults: {
    activeTones: [],
    inactiveTones: [],
    activeCategory: TonesCategory.PROFESSIONALISM,
  },
})
export class TonesState {
  constructor(private store: Store) {}

  @Selector()
  static activeTones(state: ITonesState): TonesModel[] {
    return state.activeTones;
  }

  @Selector()
  static inactiveTones(state: ITonesState): TonesModel[] {
    return state.inactiveTones;
  }

  @Selector()
  static activeCategory(state: ITonesState): TonesCategory {
    return state.activeCategory;
  }

  @Action(ChangeActiveTones)
  changeActiveTones(
    ctx: StateContext<ITonesState>,
    action: ChangeActiveTones
  ): void {
    ctx.patchState({
      activeTones: action.tones,
    });
  }

  @Action(ChangeInactiveTones)
  changeInactiveTones(
    ctx: StateContext<ITonesState>,
    action: ChangeInactiveTones
  ): void {
    ctx.patchState({
      inactiveTones: action.tones,
    });
  }

  @Action(ChangeActiveCategory)
  changeActiveCategory(
    ctx: StateContext<ITonesState>,
    action: ChangeActiveCategory
  ): void {
    ctx.patchState({
      activeCategory: action.activeCategory,
    });
  }

  @Action(UpdateActiveTones)
  updateActiveTones(
    ctx: StateContext<ITonesState>,
    action: UpdateActiveTones
  ): void {
    if (action.tone) {
      const state = ctx.getState();
      const activeTones: TonesModel[] = [action.tone, ...state.activeTones];
      const inactiveTones: TonesModel[] = [...state.inactiveTones].filter(
        (tone) => tone.id !== action.tone.id
      );
      console.log(1, activeTones);
      ctx.patchState({
        activeTones,
        inactiveTones,
      });
    }
  }

  @Action(UpdateInactiveTones)
  updateInactiveTones(
    ctx: StateContext<ITonesState>,
    action: UpdateInactiveTones
  ): void {
    if (action.tone) {
      const state = ctx.getState();
      const inactiveTones: TonesModel[] = [action.tone, ...state.inactiveTones];
      const activeTones: TonesModel[] = [...state.activeTones].filter(
        (tone) => tone.id !== action.tone.id
      );
      console.log(3, activeTones);
      ctx.patchState({
        activeTones,
        inactiveTones,
      });
    }
  }
}
