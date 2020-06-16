import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'sal-tournament-links-modal',
  templateUrl: './tournament-links-modal.component.html',
  styleUrls: ['./tournament-links-modal.component.scss'],
})
export class TournamentLinksModalComponent {
  links: { label: string; url: string }[];

  constructor(@Inject(MAT_DIALOG_DATA) tourneyRef: string) {
    this.links = [
      {
        label: 'Public Tournament Leaderboards',
        url: `https://sa-legends.com/tournaments/${tourneyRef}/leaderboard`,
      },
      {
        label: 'Stream Overlay Split Leaderboard',
        url: `https://sa-legends.com/tournaments/${tourneyRef}/stream`,
      },
      {
        label: 'Stream Overlay Scrolling Leaderboard',
        url: `https://sa-legends.com/tournaments/${tourneyRef}/spectating`,
      },
    ];
  }
}
