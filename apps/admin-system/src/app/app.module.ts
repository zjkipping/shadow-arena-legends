import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule, SETTINGS } from '@angular/fire/firestore';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PreloadAllModules, RouterModule } from '@angular/router';

import {
  AdminDashboardGuardService,
  AdminLoginGuardService,
} from '@shadow-arena-legends/shared/util-route-guards';
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
          redirectTo: 'dashboard',
          pathMatch: 'full',
        },
        {
          path: 'no-access',
          loadChildren: () =>
            import('@shadow-arena-legends/auth/feature-no-access').then(
              (m) => m.AuthFeatureNoAccessModule
            ),
        },
        {
          path: 'dashboard',
          loadChildren: () =>
            import('@shadow-arena-legends/admin/feature-dashboard').then(
              (m) => m.AdminFeatureDashboardModule
            ),
          canLoad: [AdminDashboardGuardService],
        },
        {
          path: 'login',
          loadChildren: () =>
            import('@shadow-arena-legends/admin/feature-login-screen').then(
              (m) => m.AdminFeatureLoginScreenModule
            ),
          canLoad: [AdminLoginGuardService],
        },
        {
          path: '**',
          redirectTo: 'dashboard',
        },
      ],
      {
        preloadingStrategy: PreloadAllModules,
        paramsInheritanceStrategy: 'always',
      }
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
