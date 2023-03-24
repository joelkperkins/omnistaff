import { Component, OnInit } from '@angular/core';

import { Store, Select } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';

import {
  DashboardState,
  DescriptionType,
} from '../../../state/dashboard/dashboard.state';

@Component({
  selector: 'app-descriptors-index',
  templateUrl: './descriptors-index.component.html',
  styleUrls: ['./descriptors-index.component.scss'],
})
export class DescriptorsIndexComponent implements OnInit {
  @Select(DashboardState.descriptionType)
  descriptionType$: Observable<DescriptionType>;

  TONES = DescriptionType.TONES;
  EMOTIONS = DescriptionType.EMOTIONS;
  PERSONAS = DescriptionType.PERSONAS;
  GENRES = DescriptionType.GENRES;
  TOPICS = DescriptionType.TOPICS;

  constructor() {}

  ngOnInit(): void {}
}
