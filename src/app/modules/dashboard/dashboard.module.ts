import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardIndexComponent } from './dashboard-index/dashboard-index.component';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { PromptPreviewModule } from '../prompt-preview/prompt-preview.module';

import { DescriptorsModule } from '../descriptors/descriptors.module';
import { DescriptionTypeSelectorComponent } from './description-type-selector/description-type-selector.component';

import { MatRadioModule } from '@angular/material/radio';

@NgModule({
  declarations: [DashboardIndexComponent, DescriptionTypeSelectorComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    DescriptorsModule,
    MatRadioModule,
    PromptPreviewModule,
  ],
})
export class DashboardModule {}
