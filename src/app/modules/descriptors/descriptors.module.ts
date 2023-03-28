import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DescriptorsIndexComponent } from './descriptors-index/descriptors-index.component';
import { TonesComponent } from './tones/tones.component';
import { EmotionsComponent } from './emotions/emotions.component';
import { PersonasComponent } from './personas/personas.component';
import { GenresComponent } from './genres/genres.component';
import { TopicsComponent } from './topics/topics.component';
import { ActiveComponent } from './active/active.component';
import { DescriptionTypeSelectorComponent } from './description-type-selector/description-type-selector.component';

import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MatRadioModule } from '@angular/material/radio';

@NgModule({
  declarations: [
    DescriptorsIndexComponent,
    TonesComponent,
    EmotionsComponent,
    PersonasComponent,
    GenresComponent,
    TopicsComponent,
    ActiveComponent,
    DescriptionTypeSelectorComponent,
  ],
  imports: [
    CommonModule,
    DragDropModule,
    MatSelectModule,
    MatFormFieldModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    ScrollingModule,
    MatRadioModule,
  ],
  exports: [DescriptorsIndexComponent],
})
export class DescriptorsModule {}
