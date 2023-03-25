import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { PersonasModel } from './personas.model';
import {
  ChangeInactivePersonas,
  UpdateActivePersonas,
  UpdateInactivePersonas,
  ChangeActiveCategory,
} from '../../state/personas/personas.actions';
import { PersonasCategory } from '../../state/personas/personas.state';
import { PERSONAS } from '../../constants/personas.constants';

@Injectable({
  providedIn: 'root',
})
export class PersonasService {
  constructor(private store: Store) {}

  setPersonas(): void {
    const personas = PERSONAS.map((persona) => new PersonasModel(persona));
    this.store.dispatch(new ChangeInactivePersonas(personas));
  }

  changeActiveCategory(activeCategory: PersonasCategory): void {
    this.store.dispatch(new ChangeActiveCategory(activeCategory));
  }

  updateActivePersonas(persona: PersonasModel): void {
    this.store.dispatch(new UpdateActivePersonas(persona));
  }

  updateInactivePersonas(persona: PersonasModel): void {
    this.store.dispatch(new UpdateInactivePersonas(persona));
  }
}
