import { Component, EventEmitter, Input, Output } from '@angular/core';

import { TeamEntity } from '@shadow-arena-legends/teams/data-layer';

@Component({
  selector: 'sal-teams-list',
  templateUrl: './teams-list.component.html',
  styleUrls: ['./teams-list.component.scss'],
})
export class TeamsListComponent {
  @Input() teams: TeamEntity[] | null = [];
  @Input() showEdit = true;
  @Input() showDelete = true;

  @Output() editClicked = new EventEmitter<TeamEntity>();
  @Output() deleteClicked = new EventEmitter<TeamEntity>();
}
