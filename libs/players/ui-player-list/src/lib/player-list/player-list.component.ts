import { Component, EventEmitter, Input, Output } from '@angular/core';

import { PlayerEntity } from '@shadow-arena-legends/players/data-layer';

@Component({
  selector: 'sal-player-list',
  templateUrl: './player-list.component.html',
  styleUrls: ['./player-list.component.scss'],
})
export class PlayerListComponent {
  @Input() players: PlayerEntity[] | null = [];
  @Input() showEdit = true;
  @Input() showDelete = true;

  @Output() editClicked = new EventEmitter<PlayerEntity>();
  @Output() deleteClicked = new EventEmitter<PlayerEntity>();
}
