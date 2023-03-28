import { Injectable } from '@angular/core';
import { State, Action, StateContext, Store, Selector } from '@ngxs/store';
import { PersonasModel } from '../../models/personas/personas.model';

import {
  ChangeInactivePersonas,
  UpdateActivePersonas,
  UpdateInactivePersonas,
  ChangeActiveCategory,
  ResetPersonas,
} from './personas.actions';

export enum PersonasCategory {
  OUTGOING = 'Outgoing',
  ANALYTICAL = 'Analytical',
  VISIONARY = 'Visionary',
  DETERMINED = 'Determined',
  EMPATHETIC = 'Empathetic',
}

interface IPersonasState {
  activePersonas: PersonasModel[];
  inactivePersonas: PersonasModel[];
  activeCategory: PersonasCategory;
}
@Injectable({
  providedIn: 'root',
})
@State<IPersonasState>({
  name: 'personas',
  defaults: {
    activePersonas: [],
    inactivePersonas: [],
    activeCategory: PersonasCategory.OUTGOING,
  },
})
export class PersonasState {
  constructor(private store: Store) {}

  @Selector()
  static activePersonas(state: IPersonasState): PersonasModel[] {
    return state.activePersonas;
  }

  @Selector()
  static inactivePersonas(state: IPersonasState): PersonasModel[] {
    return state.inactivePersonas;
  }

  @Selector()
  static activeCategory(state: IPersonasState): PersonasCategory {
    return state.activeCategory;
  }

  @Action(ChangeActiveCategory)
  changeActiveCategory(
    ctx: StateContext<IPersonasState>,
    action: ChangeActiveCategory
  ): void {
    ctx.patchState({
      activeCategory: action.activeCategory,
    });
  }

  @Action(ChangeInactivePersonas)
  changeInactivePersonas(
    ctx: StateContext<IPersonasState>,
    action: ChangeInactivePersonas
  ): void {
    ctx.patchState({
      inactivePersonas: action.personas,
    });
  }

  @Action(UpdateActivePersonas)
  updateActivePersonas(
    { patchState, getState }: StateContext<IPersonasState>,
    { persona }: UpdateActivePersonas
  ): void {
    const { activePersonas, inactivePersonas } = getState();

    const newActivePersonas = [...activePersonas, persona];
    const newInactivePersonas = inactivePersonas.filter(
      (item) => item.name !== persona.name
    );

    patchState({
      activePersonas: newActivePersonas,
      inactivePersonas: newInactivePersonas,
    });
  }

  @Action(UpdateInactivePersonas)
  updateInactivePersonas(
    { patchState, getState }: StateContext<IPersonasState>,
    { persona }: UpdateInactivePersonas
  ): void {
    const { activePersonas, inactivePersonas } = getState();

    const newInactivePersonas = [...inactivePersonas, persona];
    const newActivePersonas = activePersonas.filter(
      (item) => item.name !== persona.name
    );

    patchState({
      activePersonas: newActivePersonas,
      inactivePersonas: newInactivePersonas,
    });
  }

  @Action(ResetPersonas)
  resetPersonas(ctx: StateContext<IPersonasState>): void {
    ctx.patchState({
      activePersonas: [],
      inactivePersonas: [],
    });
  }
}
