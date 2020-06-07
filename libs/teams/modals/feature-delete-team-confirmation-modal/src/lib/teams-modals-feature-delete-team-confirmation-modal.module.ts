import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

import { DeleteTeamConfirmationModalComponent } from './delete-team-confirmation-modal/delete-team-confirmation-modal.component';

@NgModule({
  imports: [CommonModule, MatDialogModule, MatButtonModule],
  declarations: [DeleteTeamConfirmationModalComponent],
  entryComponents: [DeleteTeamConfirmationModalComponent],
  exports: [DeleteTeamConfirmationModalComponent],
})
export class TeamsModalsFeatureDeleteTeamConfirmationModalModule {}

export * from './delete-team-confirmation-modal/delete-team-confirmation-modal.component';
