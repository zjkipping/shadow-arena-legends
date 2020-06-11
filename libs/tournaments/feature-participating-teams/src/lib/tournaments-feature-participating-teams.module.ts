import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';

import { ParticipatingTeamsListComponent } from './participating-teams-list/participating-teams-list.component';
import { ParticipatingTeamsComponent } from './participating-teams/participating-teams.component';

@NgModule({
  imports: [
    CommonModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatInputModule,
    MatDialogModule,
    MatTooltipModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: '',
        component: ParticipatingTeamsComponent,
      },
    ]),
  ],
  declarations: [ParticipatingTeamsComponent, ParticipatingTeamsListComponent],
})
export class TournamentsFeatureParticipatingTeamsModule {}
