import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

import { SetLiveConfirmationModalComponent } from './set-live-confirmation-modal/set-live-confirmation-modal.component';

@NgModule({
  imports: [CommonModule, MatButtonModule, MatDialogModule],
  declarations: [SetLiveConfirmationModalComponent],
  exports: [SetLiveConfirmationModalComponent],
  entryComponents: [SetLiveConfirmationModalComponent],
})
export class TournamentsModalsFeatureSetLiveConfirmationModalModule {}

export * from './set-live-confirmation-modal/set-live-confirmation-modal.component';
