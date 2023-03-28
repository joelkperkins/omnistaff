import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VoiceLibraryIndexComponent } from './voice-library-index/voice-library-index.component';

const routes: Routes = [
  {
    path: '',
    component: VoiceLibraryIndexComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VoiceLibraryRoutingModule {}
