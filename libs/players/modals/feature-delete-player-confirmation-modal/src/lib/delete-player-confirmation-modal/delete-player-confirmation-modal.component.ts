import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { PlayerEntity } from '@shadow-arena-legends/players/data-layer';

@Component({
  selector: 'sal-delete-player-confirmation-modal',
  templateUrl: './delete-player-confirmation-modal.component.html',
  styleUrls: ['./delete-player-confirmation-modal.component.scss'],
})
export class DeletePlayerConfirmationModalComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public player: PlayerEntity) {}
}
