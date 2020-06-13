import { Component, Input } from '@angular/core';

import { TeamWithPoints } from '@shadow-arena-legends/leaderboard/data-layer';

@Component({
  selector: 'sal-leaderboard-row',
  templateUrl: './leaderboard-row.component.html',
  styleUrls: ['./leaderboard-row.component.scss'],
})
export class LeaderboardRowComponent {
  @Input() index = 0;
  @Input() team?: TeamWithPoints;
}
