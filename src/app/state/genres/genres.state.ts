import { Injectable } from '@angular/core';
import { State, Action, StateContext, Store, Selector } from '@ngxs/store';
import { GenresModel } from '../../models/genres/genres.model';

import {
  ChangeInactiveGenres,
  UpdateActiveGenres,
  UpdateInactiveGenres,
} from './genres.actions';

interface IGenresState {
  activeGenres: GenresModel[];
  inactiveGenres: GenresModel[];
}

@Injectable({
  providedIn: 'root',
})
@State<IGenresState>({
  name: 'genres',
  defaults: {
    activeGenres: [],
    inactiveGenres: [],
  },
})
export class GenresState {
  constructor(private store: Store) {}

  @Selector()
  static activeGenres(state: IGenresState): GenresModel[] {
    return state.activeGenres;
  }

  @Selector()
  static inactiveGenres(state: IGenresState): GenresModel[] {
    return state.inactiveGenres;
  }

  @Action(ChangeInactiveGenres)
  changeInactiveGenres(
    ctx: StateContext<IGenresState>,
    action: ChangeInactiveGenres
  ): void {
    ctx.patchState({
      inactiveGenres: action.genres,
    });
  }

  @Action(UpdateActiveGenres)
  updateActiveGenres(
    { patchState, getState }: StateContext<IGenresState>,
    { genre }: UpdateActiveGenres
  ): void {
    const { activeGenres, inactiveGenres } = getState();

    const newActiveGenres = [...activeGenres, genre];
    const newInactiveGenres = inactiveGenres.filter(
      (item) => item.name !== genre.name
    );

    patchState({
      activeGenres: newActiveGenres,
      inactiveGenres: newInactiveGenres,
    });
  }

  @Action(UpdateInactiveGenres)
  updateInactiveGenres(
    { patchState, getState }: StateContext<IGenresState>,
    { genre }: UpdateInactiveGenres
  ): void {
    const { activeGenres, inactiveGenres } = getState();

    const newActiveGenres = activeGenres.filter(
      (item) => item.name !== genre.name
    );
    const newInactiveGenres = [...inactiveGenres, genre];

    patchState({
      activeGenres: newActiveGenres,
      inactiveGenres: newInactiveGenres,
    });
  }
}
