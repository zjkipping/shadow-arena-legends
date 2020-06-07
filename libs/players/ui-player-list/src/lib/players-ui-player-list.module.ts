import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';

import { PlayerListComponent } from './player-list/player-list.component';

@NgModule({
  imports: [CommonModule, MatListModule, MatButtonModule, MatIconModule],
  declarations: [PlayerListComponent],
  exports: [PlayerListComponent],
})
export class PlayersUiPlayerListModule {}
