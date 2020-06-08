import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterModule } from '@angular/router';

import { ManagerContainerComponent } from './manager-container/manager-container.component';

@NgModule({
  imports: [
    CommonModule,
    MatTabsModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatIconModule,
    MatSlideToggleModule,
    RouterModule.forChild([
      {
        path: '',
        component: ManagerContainerComponent,
        children: [
          {
            path: '',
            redirectTo: 'participating-teams',
          },
          {
            path: 'participating-teams',
            loadChildren: () =>
              import(
                '@shadow-arena-legends/tournaments/feature-participating-teams'
              ).then((m) => m.TournamentsFeatureParticipatingTeamsModule),
          },
          {
            path: 'stats-tallier',
            loadChildren: () =>
              import(
                '@shadow-arena-legends/tournaments/feature-stats-tallier'
              ).then((m) => m.TournamentsFeatureStatsTallierModule),
          },
        ],
      },
    ]),
  ],
  declarations: [ManagerContainerComponent],
})
export class TournamentsFeatureManagerModule {}
