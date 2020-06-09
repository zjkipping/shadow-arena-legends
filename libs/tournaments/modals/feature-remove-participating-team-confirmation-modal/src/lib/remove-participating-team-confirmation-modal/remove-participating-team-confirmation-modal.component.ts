import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { ParticipatingTeamForTable } from '@shadow-arena-legends/tournaments/data-layer';

@Component({
  selector: 'sal-remove-participating-team-confirmation-modal',
  templateUrl: './remove-participating-team-confirmation-modal.component.html',
  styleUrls: ['./remove-participating-team-confirmation-modal.component.scss'],
})
export class RemoveParticipatingTeamConfirmationModalComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public team: ParticipatingTeamForTable
  ) {}
}
