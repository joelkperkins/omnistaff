import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';

import { TonesModel } from '../../../models/tones/tones.model';
import { TonesService } from '../../../models/tones/tones.service';
import { TonesState } from '../../../state/tones/tones.state';

@Component({
  selector: 'app-active',
  templateUrl: './active.component.html',
  styleUrls: ['./active.component.scss'],
})
export class ActiveComponent implements OnInit {
  @Select(TonesState.activeTones)
  activeTones$: Observable<TonesModel[]>;
  tones: TonesModel[] = [];
  tonesByCategory: any[] = [];

  constructor(private tonesService: TonesService) {}

  ngOnInit(): void {
    this.activeTones$.subscribe((tones) => {
      this.tones = tones;
      const categories = this.getCategories(tones);
      this.tonesByCategory = this.getTonesByCategory(tones, categories);
    });
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
  getTonesByCategory(tones: TonesModel[], categories: string[]): any[] {
    const tonesByCategory = [];
    categories.forEach((category) => {
      const obj = {
        key: category,
        data: tones.filter((tone) => tone.type === category),
      };
      tonesByCategory.push(obj);
    });
    return tonesByCategory;
  }

  setInactive(tone: TonesModel): void {
    this.tonesService.updateInactiveTones(tone);
  }
}
