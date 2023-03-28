import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';

import { Observable, Subscription, combineLatest } from 'rxjs';

import { PromptModel } from 'src/app/models/prompt/prompt.model';
import { PromptService } from 'src/app/models/prompt/prompt.service';

import { TonesModel } from 'src/app/models/tones/tones.model';
import { TonesState } from 'src/app/state/tones/tones.state';
import { TonesService } from 'src/app/models/tones/tones.service';
import { TONES } from 'src/app/constants/tones.constants';

import { EmotionsModel } from 'src/app/models/emotions/emotions.model';
import { EmotionsState } from 'src/app/state/emotions/emotions.state';
import { EmotionsService } from 'src/app/models/emotions/emotions.service';
import { EMOTIONS } from 'src/app/constants/emotions.constants';

import { PersonasModel } from 'src/app/models/personas/personas.model';
import { PersonasState } from 'src/app/state/personas/personas.state';
import { PersonasService } from 'src/app/models/personas/personas.service';
import { PERSONAS } from 'src/app/constants/personas.constants';

import { GenresModel } from 'src/app/models/genres/genres.model';
import { GenresState } from 'src/app/state/genres/genres.state';
import { GenresService } from 'src/app/models/genres/genres.service';
import { GENRES } from 'src/app/constants/genres.constants';

import { TopicsModel } from 'src/app/models/topics/topics.model';
import { TopicsState } from 'src/app/state/topics/topics.state';
import { TopicsService } from 'src/app/models/topics/topics.service';
import { TOPICS } from 'src/app/constants/topics.constants';

@Component({
  selector: 'app-voice-prompts',
  templateUrl: './voice-prompts.component.html',
  styleUrls: ['./voice-prompts.component.scss'],
})
export class VoicePromptsComponent implements OnInit {
  @Select(TonesState.activeTones) tones$: Observable<TonesModel[]>;
  @Select(EmotionsState.activeEmotions) emotions$: Observable<EmotionsModel[]>;
  @Select(PersonasState.activePersonas) personas$: Observable<PersonasModel[]>;
  @Select(GenresState.activeGenres) genres$: Observable<GenresModel[]>;
  @Select(TopicsState.activeTopics) topics$: Observable<TopicsModel[]>;

  subscription: Subscription = new Subscription();

  promptList: PromptModel[] = [];
  descriptionRef: any = {};

  constructor(
    private prompt: PromptService,
    private tones: TonesService,
    private emotions: EmotionsService,
    private personas: PersonasService,
    private genres: GenresService,
    private topics: TopicsService
  ) {}

  ngOnInit(): void {
    this.descriptionRef = [
      ...TONES,
      ...EMOTIONS,
      ...PERSONAS,
      ...GENRES,
      ...TOPICS,
    ].reduce((acc: any, curr: any) => {
      acc[curr.id] = curr;
      return acc;
    }, {});

    const sub1$ = combineLatest([
      this.tones$,
      this.emotions$,
      this.personas$,
      this.genres$,
      this.topics$,
    ]).subscribe(([tones, emotions, personas, genres, topics]) => {
      if (
        tones.length === 0 &&
        emotions.length === 0 &&
        personas.length === 0 &&
        genres.length === 0 &&
        topics.length === 0
      ) {
        this.promptList = this.prompt.getPrompts();
        return;
      }

      // build ref of active descriptors
      const descriptors: any = [
        tones,
        emotions,
        personas,
        genres,
        topics,
      ].reduce(
        (acc: any, curr: any) => {
          curr.forEach((item: any) => {
            acc[item.id] = item.name;
            acc.count++;
          });
          return acc;
        },
        {
          count: 0,
        }
      );

      // get prompts from local storage
      const prompts = this.prompt.getPrompts();

      // filters prompts for those that include an active descriptor
      const filteredPrompts = prompts.filter((prompt) => {
        const descriptorsArray = prompt.descriptors;
        const goal = descriptors.count;

        // count number of prompt descriptors that match active descriptors
        let count = 0;
        descriptorsArray.forEach((descriptor: any) => {
          if (descriptors[descriptor]) {
            count++;
          }
        });
        console.log('count', count);
        console.log('goal', goal);

        // if all descriptors match, return prompt
        if (count === goal) {
          return prompt;
        }
      });

      this.promptList = filteredPrompts;
      console.log('filteredPrompts', filteredPrompts);
      return filteredPrompts;
    });

    this.subscription.add(sub1$);
  }

  updateActive(descriptor: any): void {
    switch (descriptor.category) {
      case 'TONE':
        this.tones.updateActiveTones(descriptor);
        break;
      case 'EMOTION':
        this.emotions.updateActiveEmotions(descriptor);
        break;
      case 'PERSONA':
        this.personas.updateActivePersonas(descriptor);
        break;
      case 'GENRE':
        this.genres.updateActiveGenres(descriptor);
        break;
      case 'TOPIC':
        this.topics.updateActiveTopics(descriptor);
        break;
      default:
        throw new Error('Invalid descriptor category');
    }
  }

  updateInactive(descriptor: any): void {
    switch (descriptor.category) {
      case 'TONE':
        this.tones.updateInactiveTones(descriptor);
        break;
      case 'EMOTION':
        this.emotions.updateInactiveEmotions(descriptor);
        break;
      case 'PERSONA':
        this.personas.updateInactivePersonas(descriptor);
        break;
      case 'GENRE':
        this.genres.updateInactiveGenres(descriptor);
        break;
      case 'TOPIC':
        this.topics.updateInactiveTopics(descriptor);
        break;
      default:
        throw new Error('Invalid descriptor category');
    }
  }

  deletePrompt(promptId: number): void {
    this.prompt.deletePrompt(promptId);
    this.ngOnInit();
  }
}
