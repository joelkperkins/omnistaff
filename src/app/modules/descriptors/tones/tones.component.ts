import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';

import { Store, Select } from '@ngxs/store';
import { Observable, Subscription, combineLatest } from 'rxjs';

import { TonesModel } from '../../../models/tones/tones.model';
import { TonesService } from '../../../models/tones/tones.service';
import { TonesState, TonesCategory } from '../../../state/tones/tones.state';

@Component({
  selector: 'app-tones',
  templateUrl: './tones.component.html',
  styleUrls: ['./tones.component.scss'],
})
export class TonesComponent implements OnInit, OnDestroy {
  @Select(TonesState.inactiveTones)
  inactiveTones$: Observable<TonesModel[]>;

  @Select(TonesState.activeTones)
  activeTones$: Observable<TonesModel[]>;

  @Select(TonesState.activeCategory)
  activeCategory$: Observable<TonesCategory>;

  categories: string[] = [];
  category: TonesCategory;
  tones: TonesModel[] = [];
  activeTones: TonesModel[] = [];

  subscription: Subscription = new Subscription();

  constructor(private tonesService: TonesService, private store: Store) {}

  ngOnInit(): void {
    const sub$ = combineLatest([
      this.inactiveTones$,
      this.activeTones$,
      this.activeCategory$,
    ]).subscribe((items: any) => {
      const tones: TonesModel[] = items[0];
      const activeTones = items[1];
      const category: TonesCategory = items[2];
      this.category = category;
      this.categories = this.getCategories(tones);
      this.tones = tones.filter((tone) => tone.type === category);
      this.activeTones = activeTones.filter((tone) => tone.type === category);
      return this.tones;
    });
    this.subscription.add(sub$);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  drop(event: CdkDragDrop<string[]>): void {
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
  getCategories(tones): string[] {
    const categories = [];
    tones.forEach((tone) => {
      if (!categories.includes(tone.type)) {
        categories.push(tone.type);
      }
    });
    return categories;
  }

  /* iterate through tones and output an array of tones that match the category for each category
   * the output will be an object with the category as the key and an array of tones with the same type as the category
   * output { type1: [tone1, tone2, tone3], ...}
   * */
  getTonesByCategory(tones: TonesModel[], categories: string[]): object {
    const tonesByCategory = {};
    categories.forEach((category) => {
      tonesByCategory[category] = tones.filter(
        (tone) => tone.type === category
      );
    });
    return tonesByCategory;
  }

  changeTonesCategory(category: any): void {
    this.tonesService.changeActiveCategory(category.value);
  }

  setActive(tone: TonesModel): void {
    this.tonesService.updateActiveTones(tone);
  }

  setInactive(tone: TonesModel): void {
    this.tonesService.updateInactiveTones(tone);
  }
}
