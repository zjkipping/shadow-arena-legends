import { Component, Input } from '@angular/core';

import { PlayerWithKills } from '@shadow-arena-legends/leaderboard/data-layer';

@Component({
  selector: 'sal-leaderboard-player-kills-row',
  templateUrl: './leaderboard-player-kills-row.component.html',
  styleUrls: ['./leaderboard-player-kills-row.component.scss'],
})
export class LeaderboardPlayerKillsRowComponent {
  @Input() player?: PlayerWithKills;
}
