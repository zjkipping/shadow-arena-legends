import { Component, Input } from '@angular/core';

import { TeamWithPoints } from '@shadow-arena-legends/leaderboard/data-layer';

@Component({
  selector: 'sal-list-leaderboard',
  templateUrl: './list-leaderboard.component.html',
  styleUrls: ['./list-leaderboard.component.scss'],
})
export class ListLeaderboardComponent {
  @Input() teams: TeamWithPoints[] = [];
}
