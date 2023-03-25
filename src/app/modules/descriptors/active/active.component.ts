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

import { EmotionsModel } from '../../../models/emotions/emotions.model';
import { EmotionsService } from '../../../models/emotions/emotions.service';
import { EmotionsState } from '../../../state/emotions/emotions.state';

import { PersonasModel } from '../../../models/personas/personas.model';
import { PersonasService } from '../../../models/personas/personas.service';
import { PersonasState } from '../../../state/personas/personas.state';

import { GenresModel } from '../../../models/genres/genres.model';
import { GenresService } from '../../../models/genres/genres.service';
import { GenresState } from '../../../state/genres/genres.state';

import { TopicsModel } from '../../../models/topics/topics.model';
import { TopicsService } from '../../../models/topics/topics.service';
import { TopicsState } from '../../../state/topics/topics.state';

import {
  DashboardState,
  DescriptionType,
} from '../../../state/dashboard/dashboard.state';

@Component({
  selector: 'app-active',
  templateUrl: './active.component.html',
  styleUrls: ['./active.component.scss'],
})
export class ActiveComponent implements OnInit {
  @Select(DashboardState.descriptionType)
  descriptionType$: Observable<DescriptionType>;

  TONES = DescriptionType.TONES;
  EMOTIONS = DescriptionType.EMOTIONS;
  PERSONAS = DescriptionType.PERSONAS;
  GENRES = DescriptionType.GENRES;
  TOPICS = DescriptionType.TOPICS;

  @Select(TonesState.activeTones)
  activeTones$: Observable<TonesModel[]>;

  tonesByCategory: any[] = [];

  @Select(EmotionsState.activeEmotions)
  activeEmotions$: Observable<EmotionsModel[]>;

  emotionsByCategory: any[] = [];

  @Select(PersonasState.activePersonas)
  activePersonas$: Observable<PersonasModel[]>;

  personasByCategory: any[] = [];

  @Select(GenresState.activeGenres)
  activeGenres$: Observable<GenresModel[]>;

  genres: GenresModel[] = [];

  @Select(TopicsState.activeTopics)
  activeTopics$: Observable<TopicsModel[]>;

  topics: TopicsModel[] = [];

  subscriptions: Subscription = new Subscription();

  constructor(
    private tonesService: TonesService,
    private emotionsService: EmotionsService,
    private personasService: PersonasService,
    private genresService: GenresService,
    private topicsService: TopicsService
  ) {}

  ngOnInit(): void {
    const sub1$ = this.activeTones$.subscribe((tones) => {
      const categories = this.getCategories(tones);
      this.tonesByCategory = this.getDescriptorByCategory(tones, categories);
    });
    this.subscriptions.add(sub1$);

    const sub2$ = this.activeEmotions$.subscribe((emotions) => {
      const categories = this.getCategories(emotions);
      this.emotionsByCategory = this.getDescriptorByCategory(
        emotions,
        categories
      );
    });
    this.subscriptions.add(sub2$);

    const sub3$ = this.activePersonas$.subscribe((personas) => {
      const categories = this.getCategories(personas);
      this.personasByCategory = this.getDescriptorByCategory(
        personas,
        categories
      );
    });
    this.subscriptions.add(sub3$);

    const sub4$ = this.activeGenres$.subscribe((genres) => {
      this.genres = genres;
    });
    this.subscriptions.add(sub4$);

    const sub5$ = this.activeTopics$.subscribe((topics) => {
      this.topics = topics;
    });
    this.subscriptions.add(sub5$);
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
  getCategories(input): string[] {
    const categories = [];
    input.forEach((i) => {
      if (!categories.includes(i.type)) {
        categories.push(i.type);
      }
    });
    return categories;
  }

  /* iterate through tones and output an array of tones that match the category for each category
   * the output will be an object with the category as the key and an array of tones with the same type as the category
   * output { type1: [tone1, tone2, tone3], ...}
   * */
  getDescriptorByCategory(
    descriptors: TonesModel[] | EmotionsModel[] | PersonasModel[],
    categories: string[]
  ): any[] {
    const descriptorsByCategory = [];
    categories.forEach((category) => {
      const obj = {
        key: category,
        data: descriptors.filter((tone) => tone.type === category),
      };
      descriptorsByCategory.push(obj);
    });
    return descriptorsByCategory;
  }

  setInactiveTone(tone: TonesModel): void {
    this.tonesService.updateInactiveTones(tone);
  }

  setInactiveEmotion(emotion: EmotionsModel): void {
    this.emotionsService.updateInactiveEmotions(emotion);
  }

  setInactivePersona(persona: PersonasModel): void {
    this.personasService.updateInactivePersonas(persona);
  }

  setInactiveGenre(genre: GenresModel): void {
    this.genresService.updateInactiveGenres(genre);
  }

  setInactiveTopic(topic: TopicsModel): void {
    this.topicsService.updateInactiveTopics(topic);
  }
}
