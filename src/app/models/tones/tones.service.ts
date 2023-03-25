import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import {
  ChangeInactiveTones,
  UpdateActiveTones,
  UpdateInactiveTones,
  ChangeActiveCategory,
} from '../../state/tones/tones.actions';
import { TonesModel } from './tones.model';
import { TonesCategory } from '../../state/tones/tones.state';
import { TONES } from '../../constants/tones.constants';

@Injectable({
  providedIn: 'root',
})
export class TonesService {
  constructor(private store: Store) {}

  setTones(): void {
    const tones = TONES.map((tone) => new TonesModel(tone));
    this.store.dispatch(new ChangeInactiveTones(tones));
  }

  changeActiveCategory(activeCategory: TonesCategory): void {
    this.store.dispatch(new ChangeActiveCategory(activeCategory));
  }

  updateActiveTones(tone: TonesModel): void {
    this.store.dispatch(new UpdateActiveTones(tone));
  }

  updateInactiveTones(tone: TonesModel): void {
    this.store.dispatch(new UpdateInactiveTones(tone));
  }
}
