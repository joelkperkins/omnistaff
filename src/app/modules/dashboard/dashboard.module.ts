import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardIndexComponent } from './dashboard-index/dashboard-index.component';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { PromptPreviewModule } from '../prompt-preview/prompt-preview.module';

import { DescriptorsModule } from '../descriptors/descriptors.module';

@NgModule({
  declarations: [DashboardIndexComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    DescriptorsModule,
    PromptPreviewModule,
  ],
})
export class DashboardModule {}
