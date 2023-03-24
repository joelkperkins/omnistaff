import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import {
  ChangeActiveTones,
  ChangeInactiveTones,
  UpdateActiveTones,
  UpdateInactiveTones,
} from '../../state/tones/tones.actions';
import { TonesModel } from './tones.model';
import { TONES } from '../../constants/tones.constants';

@Injectable({
  providedIn: 'root',
})
export class TonesService {
  constructor(private store: Store) {}

  setTones(): void {
    const tones = TONES.map((tone) => new TonesModel(tone));
    console.log(tones);
    this.store.dispatch(new ChangeInactiveTones(tones));
  }

  setActiveTones(tones: TonesModel[], tone: TonesModel): void {
    const activeTones = [...tones, tone];
    this.store.dispatch(new ChangeActiveTones(activeTones));
  }

  setInactiveTones(activeTones: TonesModel[], tone: TonesModel): void {
    // remove tone from activeTones
    const inactiveTones = activeTones.filter((activeTone) => {
      return activeTone.id !== tone.id;
    });
    this.store.dispatch(new ChangeInactiveTones(inactiveTones));
  }

  updateActiveTones(tone: TonesModel): void {
    console.log(2, tone);
    this.store.dispatch(new UpdateActiveTones(tone));
  }

  updateInactiveTones(tone: TonesModel): void {
    console.log(3, tone);
    this.store.dispatch(new UpdateInactiveTones(tone));
  }
}
