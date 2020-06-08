import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

import { RemoveParticipatingTeamConfirmationModalComponent } from './remove-participating-team-confirmation-modal/remove-participating-team-confirmation-modal.component';

@NgModule({
  imports: [CommonModule, MatButtonModule, MatDialogModule],
  declarations: [RemoveParticipatingTeamConfirmationModalComponent],
  exports: [RemoveParticipatingTeamConfirmationModalComponent],
  entryComponents: [RemoveParticipatingTeamConfirmationModalComponent],
})
export class TournamentsModalsFeatureRemoveParticipatingTeamConfirmationModalModule {}

export * from './remove-participating-team-confirmation-modal/remove-participating-team-confirmation-modal.component';
