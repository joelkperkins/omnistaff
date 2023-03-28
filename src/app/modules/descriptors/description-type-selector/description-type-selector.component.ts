import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';

import {
  DashboardState,
  DescriptionType,
} from '../../../state/dashboard/dashboard.state';

import { ChangeActiveDescriptionType } from '../../../state/dashboard/dashboard.actions';

@Component({
  selector: 'app-description-type-selector',
  templateUrl: './description-type-selector.component.html',
  styleUrls: ['./description-type-selector.component.scss'],
})
export class DescriptionTypeSelectorComponent implements OnInit {
  @Select(DashboardState.descriptionType)
  descriptionType$: Observable<DescriptionType>;

  descriptionTypes = [
    {
      name: 'Tones',
      value: DescriptionType.TONES,
    },
    {
      name: 'Emotions',
      value: DescriptionType.EMOTIONS,
    },
    {
      name: 'Personas',
      value: DescriptionType.PERSONAS,
    },
    {
      name: 'Genres',
      value: DescriptionType.GENRES,
    },
    {
      name: 'Topics',
      value: DescriptionType.TOPICS,
    },
  ];

  constructor(private store: Store) {}

  ngOnInit(): void {}

  changeType(type: DescriptionType): void {
    this.store.dispatch(new ChangeActiveDescriptionType(type));
  }
}
