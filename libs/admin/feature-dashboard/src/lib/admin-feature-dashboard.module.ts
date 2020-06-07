import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AdminUINavigationModule } from '@shadow-arena-legends/admin/ui-navigation';

import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  imports: [
    CommonModule,
    AdminUINavigationModule,
    RouterModule.forChild([
      {
        path: '',
        component: DashboardComponent,
        children: [
          {
            path: '',
            redirectTo: 'tournaments',
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
        ],
      },
    ]),
  ],
  declarations: [DashboardComponent],
})
export class AdminFeatureDashboardModule {}
