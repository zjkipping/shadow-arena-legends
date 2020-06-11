import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { TournamentEntity } from '@shadow-arena-legends/tournaments/data-layer';

@Component({
  selector: 'sal-set-live-confirmation-modal',
  templateUrl: './set-live-confirmation-modal.component.html',
  styleUrls: ['./set-live-confirmation-modal.component.scss'],
})
export class SetLiveConfirmationModalComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public tournament: TournamentEntity) {}
}
