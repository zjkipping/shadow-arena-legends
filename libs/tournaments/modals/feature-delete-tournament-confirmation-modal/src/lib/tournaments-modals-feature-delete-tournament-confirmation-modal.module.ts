import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

import { DeleteTournamentConfirmationModalComponent } from './delete-tournament-confirmation-modal/delete-tournament-confirmation-modal.component';

@NgModule({
  imports: [CommonModule, MatDialogModule, MatButtonModule],
  declarations: [DeleteTournamentConfirmationModalComponent],
  exports: [DeleteTournamentConfirmationModalComponent],
  entryComponents: [DeleteTournamentConfirmationModalComponent],
})
export class TournamentsModalsFeatureDeleteTournamentConfirmationModalModule {}

export * from './delete-tournament-confirmation-modal/delete-tournament-confirmation-modal.component';
