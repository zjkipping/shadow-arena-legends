import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule, SETTINGS } from '@angular/fire/firestore';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';

import {
  ENVIRONMENT,
  EnvironmentType,
} from '@shadow-arena-legends/shared/util-types';

import { environment } from '../environments/environment';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    RouterModule.forRoot(
      [
        {
          path: '',
          loadChildren: () =>
            import('@shadow-arena-legends/leaderboard/feature-dashboard').then(
              (m) => m.LeaderboardFeatureDashboardModule
            ),
        },
      ],
      { paramsInheritanceStrategy: 'always' }
    ),
  ],
  providers: [
    environment.type === EnvironmentType.Dev
      ? {
          provide: SETTINGS,
          useValue: {
            host: 'localhost:8080',
            ssl: false,
          },
        }
      : [],
    {
      provide: ENVIRONMENT,
      useValue: environment,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
