import { Component, OnInit } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';

import {
  DashboardState,
  DescriptionType,
} from '../../../state/dashboard/dashboard.state';

import { TonesModel } from '../../../models/tones/tones.model';
import { TonesService } from '../../../models/tones/tones.service';
import { TonesState } from '../../../state/tones/tones.state';

@Component({
  selector: 'app-dashboard-index',
  templateUrl: './dashboard-index.component.html',
  styleUrls: ['./dashboard-index.component.scss'],
})
export class DashboardIndexComponent implements OnInit {
  constructor(private store: Store, private tones: TonesService) {}

  ngOnInit(): void {
    this.tones.setTones();
  }
}
