import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Store, Select } from '@ngxs/store';
import { Observable, Subscription, combineLatest } from 'rxjs';

import { TopicsModel } from '../../../models/topics/topics.model';
import { TopicsService } from '../../../models/topics/topics.service';
import { TopicsState } from '../../../state/topics/topics.state';

@Component({
  selector: 'app-topics',
  templateUrl: './topics.component.html',
  styleUrls: ['./topics.component.scss'],
})
export class TopicsComponent implements OnInit, OnDestroy {
  @Select(TopicsState.activeTopics)
  activeTopics$: Observable<TopicsModel[]>;

  @Select(TopicsState.inactiveTopics)
  inactiveTopics$: Observable<TopicsModel[]>;

  topics: TopicsModel[] = [];
  activeTopics: TopicsModel[] = [];

  subscription: Subscription = new Subscription();

  constructor(private store: Store, private topicsService: TopicsService) {}

  ngOnInit(): void {
    const sub$ = combineLatest([
      this.inactiveTopics$,
      this.activeTopics$,
    ]).subscribe((items: any) => {
      const topics: TopicsModel[] = items[0];
      const activeTopics: TopicsModel[] = items[1];
      this.topics = topics.filter((topic) => topic);
      this.activeTopics = activeTopics.filter((topic) => topic);
    });
    this.subscription.add(sub$);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  drop(event: CdkDragDrop<TopicsModel[]>): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  setActive(genre: TopicsModel): void {
    this.topicsService.updateActiveTopics(genre);
  }

  setInactive(genre: TopicsModel): void {
    this.topicsService.updateInactiveTopics(genre);
  }
}
