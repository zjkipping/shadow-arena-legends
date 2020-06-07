import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { EditPlayerModalComponent } from './edit-player-modal/edit-player-modal.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  declarations: [EditPlayerModalComponent],
  entryComponents: [EditPlayerModalComponent],
  exports: [EditPlayerModalComponent],
})
export class PlayersModalsFeatureEditPlayerModalModule {}

export * from './edit-player-modal/edit-player-modal.component';
