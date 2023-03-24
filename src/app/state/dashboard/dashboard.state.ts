import { Injectable } from '@angular/core';
import { State, Action, StateContext, Store, Selector } from '@ngxs/store';
import { ChangeActiveDescriptionType } from './dashboard.actions';

// eslint-disable-next-line
export enum DescriptionType {
  TONES = 'TONES',
  EMOTIONS = 'EMOTIONS',
  PERSONAS = 'PERSONAS',
  GENRES = 'GENRES',
  TOPICS = 'TOPICS',
}

interface IDashboardState {
  descriptionType: DescriptionType;
}

@Injectable({
  providedIn: 'root',
})
@State<IDashboardState>({
  name: 'dashboard',
  defaults: {
    descriptionType: DescriptionType.TONES,
  },
})
export class DashboardState {
  constructor(private store: Store) {}

  @Selector()
  static descriptionType(state: IDashboardState): DescriptionType {
    return state.descriptionType;
  }

  @Action(ChangeActiveDescriptionType)
  changeActiveDescriptionType(
    ctx: StateContext<IDashboardState>,
    action: ChangeActiveDescriptionType
  ): void {
    ctx.patchState({
      descriptionType: action.descriptionType,
    });
  }
}
