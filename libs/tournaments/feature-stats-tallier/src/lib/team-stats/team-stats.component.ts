import { Component, Input } from '@angular/core';

import { TeamsService } from '@shadow-arena-legends/teams/data-layer';

import { TeamStatsForList } from '../../types';

@Component({
  selector: 'sal-team-stats',
  templateUrl: './team-stats.component.html',
  styleUrls: ['./team-stats.component.scss'],
})
export class TeamStatsComponent {
  @Input() teamStats?: TeamStatsForList;

  constructor(private ts: TeamsService) {}

  addFirst() {
    if (this.teamStats) {
      this.ts.incrementFirstPlaceStat(
        this.teamStats.teamId,
        this.teamStats.tourneyId
      );
    }
  }

  addSecond() {
    if (this.teamStats) {
      this.ts.incrementSecondPlaceStat(
        this.teamStats.teamId,
        this.teamStats.tourneyId
      );
    }
  }

  addThird() {
    if (this.teamStats) {
      this.ts.incrementThirdPlaceStat(
        this.teamStats.teamId,
        this.teamStats.tourneyId
      );
    }
  }

  subtractFirst() {
    if (this.teamStats && this.teamStats.firstPlace !== 0) {
      this.ts.decrementFirstPlaceStat(
        this.teamStats.teamId,
        this.teamStats.tourneyId
      );
    }
  }

  subtractSecond() {
    if (this.teamStats && this.teamStats.secondPlace !== 0) {
      this.ts.decrementSecondPlaceStat(
        this.teamStats.teamId,
        this.teamStats.tourneyId
      );
    }
  }

  subtractThird() {
    if (this.teamStats && this.teamStats.thirdPlace !== 0) {
      this.ts.decrementThirdPlaceStat(
        this.teamStats.teamId,
        this.teamStats.tourneyId
      );
    }
  }
}
