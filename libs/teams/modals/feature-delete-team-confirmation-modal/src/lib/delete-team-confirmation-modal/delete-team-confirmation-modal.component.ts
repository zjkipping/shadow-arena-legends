import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { TeamEntity } from '@shadow-arena-legends/teams/data-layer';

@Component({
  selector: 'shadow-arena-legends-delete-team-confirmation-modal',
  templateUrl: './delete-team-confirmation-modal.component.html',
  styleUrls: ['./delete-team-confirmation-modal.component.scss'],
})
export class DeleteTeamConfirmationModalComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public team: TeamEntity) {}
}
