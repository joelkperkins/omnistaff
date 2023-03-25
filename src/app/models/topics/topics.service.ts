import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { TopicsModel } from './topics.model';
import { TOPICS } from '../../constants/topics.constants';
import {
  ChangeInactiveTopics,
  UpdateActiveTopics,
  UpdateInactiveTopics,
} from '../../state/topics/topics.actions';

@Injectable({
  providedIn: 'root',
})
export class TopicsService {
  constructor(private store: Store) {}

  setTopics(): void {
    const emotions = TOPICS.map((topics) => new TopicsModel(topics));
    this.store.dispatch(new ChangeInactiveTopics(emotions));
  }

  updateActiveTopics(topic: TopicsModel): void {
    this.store.dispatch(new UpdateActiveTopics(topic));
  }

  updateInactiveTopics(topic: TopicsModel): void {
    this.store.dispatch(new UpdateInactiveTopics(topic));
  }
}
