import { Component, Input } from '@angular/core';

import { TeamWithPoints } from '@shadow-arena-legends/leaderboard/data-layer';

@Component({
  selector: 'sal-leaderboard-team-points-row',
  templateUrl: './leaderboard-team-points-row.component.html',
  styleUrls: ['./leaderboard-team-points-row.component.scss'],
})
export class LeaderboardTeamPointsRowComponent {
  @Input() team?: TeamWithPoints;
}
