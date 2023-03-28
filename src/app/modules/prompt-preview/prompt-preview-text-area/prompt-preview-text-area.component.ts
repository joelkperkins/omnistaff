import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Store, Select } from '@ngxs/store';
import { Observable, Subscription, combineLatest } from 'rxjs';

import { PromptModel } from '../../../models/prompt/prompt.model';
import { TonesModel } from '../../../models/tones/tones.model';
import { EmotionsModel } from '../../../models/emotions/emotions.model';
import { PersonasModel } from '../../../models/personas/personas.model';
import { GenresModel } from '../../../models/genres/genres.model';
import { TopicsModel } from '../../../models/topics/topics.model';

import { PromptState } from '../../../state/prompt/prompt.state';
import { TonesState } from '../../../state/tones/tones.state';
import { EmotionsState } from '../../../state/emotions/emotions.state';
import { PersonasState } from '../../../state/personas/personas.state';
import { GenresState } from '../../../state/genres/genres.state';
import { TopicsState } from '../../../state/topics/topics.state';

import { ChangeTonePrompt } from '../../../state/prompt/prompt.actions';
import { ChangeEmotionPrompt } from '../../../state/prompt/prompt.actions';
import { ChangePersonaPrompt } from '../../../state/prompt/prompt.actions';
import { ChangeGenrePrompt } from '../../../state/prompt/prompt.actions';
import { ChangeTopicPrompt } from '../../../state/prompt/prompt.actions';

import { PromptService } from '../../../models/prompt/prompt.service';
import { TonesService } from '../../../models/tones/tones.service';
import { EmotionsService } from '../../../models/emotions/emotions.service';
import { PersonasService } from '../../../models/personas/personas.service';
import { GenresService } from '../../../models/genres/genres.service';
import { TopicsService } from '../../../models/topics/topics.service';

@Component({
  selector: 'app-prompt-preview-text-area',
  templateUrl: './prompt-preview-text-area.component.html',
  styleUrls: ['./prompt-preview-text-area.component.scss'],
})
export class PromptPreviewTextAreaComponent implements OnInit, OnDestroy {
  @Select(PromptState.tonePrompt)
  tonePrompt$: Observable<PromptModel>;

  @Select(PromptState.emotionPrompt)
  emotionPrompt$: Observable<PromptModel>;

  @Select(PromptState.personaPrompt)
  personaPrompt$: Observable<PromptModel>;

  @Select(PromptState.genrePrompt)
  genrePrompt$: Observable<PromptModel>;

  @Select(PromptState.topicPrompt)
  topicPrompt$: Observable<PromptModel>;

  @Select(TonesState.activeTones)
  activeTones$: Observable<TonesModel[]>;

  @Select(EmotionsState.activeEmotions)
  activeEmotions$: Observable<EmotionsModel[]>;

  @Select(PersonasState.activePersonas)
  activePersonas$: Observable<PersonasModel[]>;

  @Select(GenresState.activeGenres)
  activeGenres$: Observable<GenresModel[]>;

  @Select(TopicsState.activeTopics)
  activeTopics$: Observable<TopicsModel[]>;

  sub: Subscription = new Subscription();

  promptPreview = new FormGroup({
    tone: new FormControl({ value: null, disabled: false }, []),
    emotion: new FormControl({ value: null, disabled: false }, []),
    persona: new FormControl({ value: null, disabled: false }, []),
    genre: new FormControl({ value: null, disabled: false }, []),
    topic: new FormControl({ value: null, disabled: false }, []),
  });

  constructor(
    private store: Store,
    private promptService: PromptService,
    private tonesService: TonesService,
    private emotionsService: EmotionsService,
    private personasService: PersonasService,
    private genresService: GenresService,
    private topicsService: TopicsService
  ) {}

  ngOnInit(): void {
    const sub1$ = combineLatest([
      this.tonePrompt$,
      this.emotionPrompt$,
      this.personaPrompt$,
      this.genrePrompt$,
      this.topicPrompt$,
    ]).subscribe(
      ([
        tonePrompt,
        emotionPrompt,
        personaPrompt,
        genrePrompt,
        topicPrompt,
      ]) => {
        if (tonePrompt) {
          this.promptPreview.patchValue({
            tone: tonePrompt.body,
          });
        } else {
          this.promptPreview.patchValue({
            tone: null,
          });
        }
        if (emotionPrompt) {
          this.promptPreview.patchValue({
            emotion: emotionPrompt.body,
          });
        } else {
          this.promptPreview.patchValue({
            emotion: null,
          });
        }
        if (personaPrompt) {
          this.promptPreview.patchValue({
            persona: personaPrompt.body,
          });
        } else {
          this.promptPreview.patchValue({
            persona: null,
          });
        }
        if (genrePrompt) {
          this.promptPreview.patchValue({
            genre: genrePrompt.body,
          });
        } else {
          this.promptPreview.patchValue({
            genre: null,
          });
        }
        if (topicPrompt) {
          this.promptPreview.patchValue({
            topic: topicPrompt.body,
          });
        } else {
          this.promptPreview.patchValue({
            topic: null,
          });
        }
      }
    );
    this.sub.add(sub1$);

    // subscribe to tones and set prompt statements
    const sub2$ = this.activeTones$.subscribe((tones) => {
      if (tones.length > 0) {
        this.promptService.setTonePromt(tones, 'Tone Prompt');
      } else {
        this.store.dispatch(new ChangeTonePrompt(null));
      }
    });
    this.sub.add(sub2$);

    // subscribe to emotions and set prompt statements
    const sub3$ = this.activeEmotions$.subscribe((emotions) => {
      if (emotions.length > 0) {
        this.promptService.setEmotionPrompt(emotions, 'Emotion Prompt');
      } else {
        this.store.dispatch(new ChangeEmotionPrompt(null));
      }
    });
    this.sub.add(sub3$);

    // subscribe to personas and set prompt statements
    const sub4$ = this.activePersonas$.subscribe((personas) => {
      if (personas.length > 0) {
        this.promptService.setPersonaPrompt(personas, 'Persona Prompt');
      } else {
        this.store.dispatch(new ChangePersonaPrompt(null));
      }
    });
    this.sub.add(sub4$);

    // subscribe to genres and set prompt statements
    const sub5$ = this.activeGenres$.subscribe((genres) => {
      if (genres.length > 0) {
        this.promptService.setGenrePrompt(genres, 'Genre Prompt');
      } else {
        this.store.dispatch(new ChangeGenrePrompt(null));
      }
    });
    this.sub.add(sub5$);

    // subscribe to topics and set prompt statements
    const sub6$ = this.activeTopics$.subscribe((topics) => {
      if (topics.length > 0) {
        this.promptService.setTopicPrompt(topics, 'Topic Prompt');
      } else {
        this.store.dispatch(new ChangeTopicPrompt(null));
      }
    });
    this.sub.add(sub6$);

    this.watchToneChanges();
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  watchToneChanges(): void {
    this.promptPreview.controls.tone.valueChanges.subscribe((value) => {});
  }

  updateInactive(descriptor: any): void {
    switch (descriptor.category) {
      case 'TONE':
        this.tonesService.updateInactiveTones(descriptor);
        break;
      case 'EMOTION':
        this.emotionsService.updateInactiveEmotions(descriptor);
        break;
      case 'PERSONA':
        this.personasService.updateInactivePersonas(descriptor);
        break;
      case 'GENRE':
        this.genresService.updateInactiveGenres(descriptor);
        break;
      case 'TOPIC':
        this.topicsService.updateInactiveTopics(descriptor);
        break;
      default:
        throw new Error('Invalid descriptor category');
    }
  }
}
