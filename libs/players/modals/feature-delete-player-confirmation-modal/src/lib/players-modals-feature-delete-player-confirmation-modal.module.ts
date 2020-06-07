import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

import { DeletePlayerConfirmationModalComponent } from './delete-player-confirmation-modal/delete-player-confirmation-modal.component';

@NgModule({
  imports: [CommonModule, MatDialogModule, MatButtonModule],
  declarations: [DeletePlayerConfirmationModalComponent],
  entryComponents: [DeletePlayerConfirmationModalComponent],
  exports: [DeletePlayerConfirmationModalComponent],
})
export class PlayersModalsFeatureDeletePlayerConfirmationModalModule {}

export * from './delete-player-confirmation-modal/delete-player-confirmation-modal.component';
