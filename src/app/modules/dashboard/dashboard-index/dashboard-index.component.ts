import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';

import {
  DashboardState,
  DescriptionType,
} from '../../../state/dashboard/dashboard.state';

import { TonesState } from '../../../state/tones/tones.state';
import { TonesService } from '../../../models/tones/tones.service';
import { TonesModel } from '../../../models/tones/tones.model';

import { EmotionsState } from '../../../state/emotions/emotions.state';
import { EmotionsModel } from '../../../models/emotions/emotions.model';
import { EmotionsService } from '../../../models/emotions/emotions.service';

import { PersonasState } from '../../../state/personas/personas.state';
import { PersonasModel } from '../../../models/personas/personas.model';
import { PersonasService } from '../../../models/personas/personas.service';

import { GenresState } from '../../../state/genres/genres.state';
import { GenresModel } from '../../../models/genres/genres.model';
import { GenresService } from '../../../models/genres/genres.service';

import { TopicsState } from '../../../state/topics/topics.state';
import { TopicsModel } from '../../../models/topics/topics.model';
import { TopicsService } from '../../../models/topics/topics.service';

import { PromptService } from '../../../models/prompt/prompt.service';

@Component({
  selector: 'app-dashboard-index',
  templateUrl: './dashboard-index.component.html',
  styleUrls: ['./dashboard-index.component.scss'],
})
export class DashboardIndexComponent implements OnInit, OnDestroy {
  @Select(TonesState.activeTones) tones$: Observable<TonesModel[]>;
  @Select(EmotionsState.activeEmotions) emotions$: Observable<EmotionsModel[]>;
  @Select(PersonasState.activePersonas) personas$: Observable<PersonasModel[]>;
  @Select(GenresState.activeGenres) genres$: Observable<GenresModel[]>;
  @Select(TopicsState.activeTopics) topics$: Observable<TopicsModel[]>;

  subscription: Subscription = new Subscription();

  constructor(
    private store: Store,
    private tones: TonesService,
    private emotions: EmotionsService,
    private personas: PersonasService,
    private genres: GenresService,
    private topics: TopicsService,
    private prompt: PromptService
  ) {}

  ngOnInit(): void {
    const sub1$ = this.tones$.subscribe((tones) => {
      if (tones === null) {
        console.log('tones', tones);
        this.tones.setTones();
      } else if (tones.length === 0) {
        this.tones.setTones();
      }
    });
    this.subscription.add(sub1$);

    const sub2$ = this.emotions$.subscribe((emotions) => {
      if (emotions === null) {
        this.emotions.setEmotions();
      } else if (emotions.length === 0) {
        this.emotions.setEmotions();
      }
    });
    this.subscription.add(sub2$);

    const sub3$ = this.personas$.subscribe((personas) => {
      if (personas === null) {
        this.personas.setPersonas();
      } else if (personas.length === 0) {
        this.personas.setPersonas();
      }
    });
    this.subscription.add(sub3$);

    const sub4$ = this.genres$.subscribe((genres) => {
      if (genres === null) {
        this.genres.setGenres();
      } else if (genres.length === 0) {
        this.genres.setGenres();
      }
    });
    this.subscription.add(sub4$);

    const sub5$ = this.topics$.subscribe((topics) => {
      if (topics === null) {
        this.topics.setTopics();
      } else if (topics.length === 0) {
        this.topics.setTopics();
      }
    });
    this.subscription.add(sub5$);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  reset(): void {
    this.prompt.resetPromptInputs();
  }
}
