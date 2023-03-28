import { Component, OnInit } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';

import {
  DashboardState,
  DescriptionType,
} from '../../../state/dashboard/dashboard.state';

import { TonesService } from '../../../models/tones/tones.service';
import { EmotionsService } from '../../../models/emotions/emotions.service';
import { PersonasService } from '../../../models/personas/personas.service';
import { GenresService } from '../../../models/genres/genres.service';
import { TopicsService } from '../../../models/topics/topics.service';

import { PromptService } from '../../../models/prompt/prompt.service';

@Component({
  selector: 'app-dashboard-index',
  templateUrl: './dashboard-index.component.html',
  styleUrls: ['./dashboard-index.component.scss'],
})
export class DashboardIndexComponent implements OnInit {
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
    this.prompt.resetPromptInputs();
    this.tones.setTones();
    this.emotions.setEmotions();
    this.personas.setPersonas();
    this.genres.setGenres();
    this.topics.setTopics();
  }
}
