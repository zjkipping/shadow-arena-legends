import { Component, Input } from '@angular/core';

import { PlayerWithKills } from '@shadow-arena-legends/leaderboard/data-layer';

@Component({
  selector: 'sal-player-kills-leaderboard',
  templateUrl: './player-kills-leaderboard.component.html',
  styleUrls: ['./player-kills-leaderboard.component.scss'],
})
export class PlayerKillsLeaderboardComponent {
  @Input() set players(val: PlayerWithKills[] | null) {
    console.log(val);
    if (!!val) {
      const newColumns = [];
      const columnCount = Math.ceil(val.length / 10);
      for (let i = 0; i < columnCount; i++) {
        newColumns.push(val.slice(i * 10, i * 10 + 10));
      }
      this.columns = newColumns;
      this.loadingTeams = false;
    }
  }

  loadingTeams = true;

  columns: PlayerWithKills[][] = [];
}
