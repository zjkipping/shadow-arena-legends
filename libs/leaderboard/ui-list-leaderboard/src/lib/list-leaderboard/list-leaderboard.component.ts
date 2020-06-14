import { Component, Input, OnDestroy } from '@angular/core';
import { interval, Subject } from 'rxjs';
import { startWith, takeUntil } from 'rxjs/operators';

import { TeamWithPoints } from '@shadow-arena-legends/leaderboard/data-layer';

@Component({
  selector: 'sal-list-leaderboard',
  templateUrl: './list-leaderboard.component.html',
  styleUrls: ['./list-leaderboard.component.scss'],
})
export class ListLeaderboardComponent implements OnDestroy {
  @Input('teams') set _team(val: TeamWithPoints[] | null) {
    if (!!val) {
      this.data = val;
      if (this.loadingTeams) {
        this.startTimer();
        this.loadingTeams = false;
      }
    }
  }

  destroy = new Subject();

  loadingTeams = true;

  data: TeamWithPoints[] = [];
  teams: TeamWithPoints[] = [];

  indexes = [0, 1, 2];

  startTimer() {
    interval(2000)
      .pipe(startWith(null), takeUntil(this.destroy))
      .subscribe(() => {
        this.selectVisibleRows();
        this.adjustIndex();
      });
  }

  adjustIndex() {
    let endingIndex = this.indexes[this.indexes.length - 1] + 1;
    if (endingIndex >= this.data.length) {
      endingIndex = 0;
    }
    this.indexes = [...this.indexes.slice(1, 3), endingIndex];
  }

  selectVisibleRows() {
    this.teams = this.indexes.map((index) => this.data[index]);
  }

  ngOnDestroy() {
    this.destroy.next();
    this.destroy.complete();
  }
}
