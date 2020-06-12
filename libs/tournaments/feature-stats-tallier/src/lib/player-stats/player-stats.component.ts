import { Component, Input } from '@angular/core';

import {
  PlayersService,
  PlayerStatsForTourney,
} from '@shadow-arena-legends/players/data-layer';

@Component({
  selector: 'sal-player-stats',
  templateUrl: './player-stats.component.html',
  styleUrls: ['./player-stats.component.scss'],
})
export class PlayerStatsComponent {
  @Input() playerStats?: PlayerStatsForTourney;

  constructor(private ps: PlayersService) {}

  addKill() {
    if (this.playerStats) {
      this.ps.incrementKillsStat(
        this.playerStats.playerId,
        this.playerStats.tourneyId
      );
    }
  }

  subtractKill() {
    if (this.playerStats && this.playerStats.kills !== 0) {
      this.ps.decrementKillsStat(
        this.playerStats.playerId,
        this.playerStats.tourneyId
      );
    }
  }
}
