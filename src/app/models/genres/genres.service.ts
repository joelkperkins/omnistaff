import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { GenresModel } from './genres.model';
import {
  ChangeInactiveGenres,
  UpdateActiveGenres,
  UpdateInactiveGenres,
} from '../../state/genres/genres.actions';
import { GENRES } from '../../constants/genres.constants';

@Injectable({
  providedIn: 'root',
})
export class GenresService {
  constructor(private store: Store) {}

  setGenres(): void {
    const genres = GENRES.map((genre) => new GenresModel(genre));
    this.store.dispatch(new ChangeInactiveGenres(genres));
  }

  updateActiveGenres(genre: GenresModel): void {
    this.store.dispatch(new UpdateActiveGenres(genre));
  }

  updateInactiveGenres(genre: GenresModel): void {
    this.store.dispatch(new UpdateInactiveGenres(genre));
  }
}
