import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import {
  LeaderboardService,
  PlayerWithKills,
} from '@shadow-arena-legends/leaderboard/data-layer';
import { TOURNAMENT_ID_ROUTE_PARAM } from '@shadow-arena-legends/shared/util-route-params';

@Component({
  selector: 'sal-player-kills-ranking',
  templateUrl: './player-kills-ranking.component.html',
  styleUrls: ['./player-kills-ranking.component.scss'],
})
export class PlayerKillsRankingComponent {
  players: Observable<PlayerWithKills[]>;

  constructor(leaderboardService: LeaderboardService, route: ActivatedRoute) {
    this.players = route.paramMap.pipe(
      map((params) => params.get(TOURNAMENT_ID_ROUTE_PARAM) as string),
      switchMap((id) => leaderboardService.getPlayersWithKills(id))
    );
  }
}
