import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PromptPreviewIndexComponent } from './prompt-preview-index/prompt-preview-index.component';
import { PromptPreviewTextAreaComponent } from './prompt-preview-text-area/prompt-preview-text-area.component';
import { ActivePromptComponent } from './active-prompt/active-prompt.component';

import { TextFieldModule } from '@angular/cdk/text-field';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';

@NgModule({
  declarations: [
    PromptPreviewIndexComponent,
    PromptPreviewTextAreaComponent,
    ActivePromptComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TextFieldModule,
    MatFormFieldModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatCheckboxModule,
    MatChipsModule,
  ],
  exports: [PromptPreviewIndexComponent],
})
export class PromptPreviewModule {}
