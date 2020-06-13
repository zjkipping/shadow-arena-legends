import { Component, Input } from '@angular/core';

import { TeamWithPoints } from '@shadow-arena-legends/leaderboard/data-layer';

@Component({
  selector: 'sal-split-leaderboard',
  templateUrl: './split-leaderboard.component.html',
  styleUrls: ['./split-leaderboard.component.scss'],
})
export class SplitLeaderboardComponent {
  @Input() set teams(val: TeamWithPoints[] | null) {
    if (!!val) {
      let half = Math.floor(val.length / 2);
      if (val.length % 2 !== 0) {
        half += 1;
      }
      this.leftSide = val.slice(0, half);
      this.rightSide = val.slice(half, val.length);
    }
  }

  leftSide: TeamWithPoints[] = [];
  rightSide: TeamWithPoints[] = [];
}
