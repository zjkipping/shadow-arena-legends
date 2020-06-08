import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { TournamentEntity } from '@shadow-arena-legends/tournaments/data-layer';

@Component({
  selector: 'sal-delete-tournament-confirmation-modal',
  templateUrl: './delete-tournament-confirmation-modal.component.html',
  styleUrls: ['./delete-tournament-confirmation-modal.component.scss'],
})
export class DeleteTournamentConfirmationModalComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public tournament: TournamentEntity) {}
}
