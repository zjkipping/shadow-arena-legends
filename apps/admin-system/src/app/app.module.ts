import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule, SETTINGS } from '@angular/fire/firestore';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { AdminUINavigationModule } from '@shadow-arena-legends/admin/ui-navigation';

import { environment } from '../environments/environment';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    BrowserAnimationsModule,
    AdminUINavigationModule,
    RouterModule.forRoot([
      {
        path: '',
        redirectTo: 'tournaments',
        pathMatch: 'full',
      },
      {
        path: 'tournaments',
        loadChildren: () =>
          import('@shadow-arena-legends/tournaments/feature-landing').then(
            (m) => m.TournamentsFeatureLandingModule
          ),
      },
      {
        path: 'teams',
        loadChildren: () =>
          import('@shadow-arena-legends/teams/feature-landing').then(
            (m) => m.TeamsFeatureLandingModule
          ),
      },
      {
        path: 'players',
        loadChildren: () =>
          import('@shadow-arena-legends/players/feature-landing').then(
            (m) => m.PlayersFeatureLandingModule
          ),
      },
    ]),
  ],
  providers: [
    {
      provide: SETTINGS,
      useValue: environment.production
        ? undefined
        : {
            host: 'localhost:8080',
            ssl: false,
          },
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
