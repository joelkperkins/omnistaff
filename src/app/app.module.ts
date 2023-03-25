import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './components/login/login.component';
import { HeaderComponent } from './components/header/header.component';

import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';

import { AuthState } from './state/auth/auth.state';
import { DashboardState } from './state/dashboard/dashboard.state';
import { TonesState } from './state/tones/tones.state';
import { PromptState } from './state/prompt/prompt.state';
import { EmotionsState } from './state/emotions/emotions.state';
import { PersonasState } from './state/personas/personas.state';
import { GenresState } from './state/genres/genres.state';
import { TopicsState } from './state/topics/topics.state';

@NgModule({
  declarations: [AppComponent, LoginComponent, HeaderComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NoopAnimationsModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,
    MatToolbarModule,
    NgxsModule.forRoot(
      [
        AuthState,
        DashboardState,
        TonesState,
        PromptState,
        EmotionsState,
        PersonasState,
        GenresState,
        TopicsState,
      ],
      {
        developmentMode: true,
        selectorOptions: {
          suppressErrors: false,
          injectContainerState: false,
        },
      }
    ),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
