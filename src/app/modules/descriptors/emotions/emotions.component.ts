import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';

import { Store, Select } from '@ngxs/store';
import { Observable, Subscription, combineLatest } from 'rxjs';

import { EmotionsModel } from '../../../models/emotions/emotions.model';
import { EmotionsService } from '../../../models/emotions/emotions.service';
import {
  EmotionsState,
  EmotionsCategory,
} from '../../../state/emotions/emotions.state';

@Component({
  selector: 'app-emotions',
  templateUrl: './emotions.component.html',
  styleUrls: ['./emotions.component.scss'],
})
export class EmotionsComponent implements OnInit, OnDestroy {
  @Select(EmotionsState.activeEmotions)
  activeEmotions$: Observable<EmotionsModel[]>;

  @Select(EmotionsState.inactiveEmotions)
  inactiveEmotions$: Observable<EmotionsModel[]>;

  @Select(EmotionsState.activeCategory)
  activeCategory$: Observable<EmotionsCategory>;

  categories: string[] = [];
  category: EmotionsCategory;
  emotions: EmotionsModel[] = [];
  activeEmotions: EmotionsModel[] = [];

  subscription: Subscription = new Subscription();

  constructor(private store: Store, private emotionsService: EmotionsService) {}

  ngOnInit(): void {
    const sub$ = combineLatest([
      this.inactiveEmotions$,
      this.activeEmotions$,
      this.activeCategory$,
    ]).subscribe((items: any) => {
      const emotions: EmotionsModel[] = items[0];
      const activeEmotions: EmotionsModel[] = items[1];
      const category: EmotionsCategory = items[2];
      this.category = category;
      this.categories = this.getCategories(emotions);
      this.emotions = emotions.filter((emotion) => emotion.type === category);
      this.activeEmotions = activeEmotions.filter(
        (emotion) => emotion.type === category
      );
    });
    this.subscription.add(sub$);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  drop(event: CdkDragDrop<EmotionsModel[]>): void {
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

  /* iterate through the categories and output an array of each unique type
   * the key will be type { type: string }
   * output ['type1', 'type2', 'type3']
   * */
  getCategories(emotions): string[] {
    const categories = [];
    emotions.forEach((emotion) => {
      if (!categories.includes(emotion.type)) {
        categories.push(emotion.type);
      }
    });
    return categories;
  }

  changeEmotionsCategory(category: any): void {
    this.emotionsService.changeActiveCategory(category.value);
  }

  setActive(tone: EmotionsModel): void {
    this.emotionsService.updateActiveEmotions(tone);
  }

  setInactive(tone: EmotionsModel): void {
    this.emotionsService.updateInactiveEmotions(tone);
  }
}
