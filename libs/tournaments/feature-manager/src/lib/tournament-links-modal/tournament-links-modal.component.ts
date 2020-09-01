import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import {
  ENVIRONMENT,
  Environment,
} from '@shadow-arena-legends/shared/util-types';

@Component({
  selector: 'sal-tournament-links-modal',
  templateUrl: './tournament-links-modal.component.html',
  styleUrls: ['./tournament-links-modal.component.scss'],
})
export class TournamentLinksModalComponent {
  links: { label: string; url: string }[];

  constructor(
    @Inject(MAT_DIALOG_DATA) tourneyRef: string,
    @Inject(ENVIRONMENT) env: Environment
  ) {
    this.links = [
      {
        label: 'Public Tournament Leaderboards',
        url: `${env.leaderboardDomain}/tournaments/${tourneyRef}/leaderboard`,
      },
      {
        label: 'Stream Overlay Team Scores Leaderboard',
        url: `${env.leaderboardDomain}/tournaments/${tourneyRef}/stream`,
      },
      {
        label: 'Stream Overlay Scrolling Ranks Leaderboard',
        url: `${env.leaderboardDomain}/tournaments/${tourneyRef}/spectating`,
      },
      {
        label: 'Stream Overlay Player Kills Leaderboard',
        url: `${env.leaderboardDomain}/tournaments/${tourneyRef}/player-ranking`,
      },
    ];
  }
}
