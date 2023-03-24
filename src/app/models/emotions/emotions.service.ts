import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { EmotionsModel } from './emotions.model';
import {
  UpdateActiveEmotions,
  UpdateInactiveEmotions,
  ChangeInactiveEmotions,
} from '../../state/emotions/emotions.actions';
import { EMOTIONS } from '../../constants/emotions.constants';

@Injectable({
  providedIn: 'root',
})
export class EmotionsService {
  constructor(private store: Store) {}

  setEmotions(): void {
    const emotions = EMOTIONS.map((emotion) => new EmotionsModel(emotion));
    this.store.dispatch(new ChangeInactiveEmotions(emotions));
  }

  updateActiveEmotion(emotion: EmotionsModel): void {
    this.store.dispatch(new UpdateActiveEmotions(emotion));
  }

  updateInactiveEmotions(emotion: EmotionsModel): void {
    this.store.dispatch(new UpdateInactiveEmotions(emotion));
  }
}
