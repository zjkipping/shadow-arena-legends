import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule, SETTINGS } from '@angular/fire/firestore';
import { MatSnackBarModule } from '@angular/material/snack-bar';

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
    MatSnackBarModule,
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
