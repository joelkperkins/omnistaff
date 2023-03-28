import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VoiceLibraryIndexComponent } from './voice-library-index/voice-library-index.component';

import { VoiceLibraryRoutingModule } from './voice-library-routing.module';

import { DescriptorsModule } from '../descriptors/descriptors.module';
import { VoicePromptsComponent } from './voice-prompts/voice-prompts.component';

import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [VoiceLibraryIndexComponent, VoicePromptsComponent],
  imports: [
    CommonModule,
    VoiceLibraryRoutingModule,
    DescriptorsModule,
    MatCardModule,
    MatChipsModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
  ],
})
export class VoiceLibraryModule {}
