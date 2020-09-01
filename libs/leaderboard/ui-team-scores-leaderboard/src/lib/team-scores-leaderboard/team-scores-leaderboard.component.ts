import { Component, Input } from '@angular/core';

import { TeamWithPoints } from '@shadow-arena-legends/leaderboard/data-layer';

@Component({
  selector: 'sal-team-scores-leaderboard',
  templateUrl: './team-scores-leaderboard.component.html',
  styleUrls: ['./team-scores-leaderboard.component.scss'],
})
export class TeamScoresLeaderboardComponent {
  @Input() set teams(val: TeamWithPoints[] | null) {
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

  columns: TeamWithPoints[][] = [];
}
