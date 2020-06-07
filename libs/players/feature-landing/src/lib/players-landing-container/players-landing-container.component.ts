import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

import {
  PlayerDoc,
  PlayerEntity,
  PlayersService,
} from '@shadow-arena-legends/players/data-layer';
import { DeletePlayerConfirmationModalComponent } from '@shadow-arena-legends/players/modals/feature-delete-player-confirmation-modal';
import { EditPlayerModalComponent } from '@shadow-arena-legends/players/modals/feature-edit-player-modal';

@Component({
  selector: 'sal-players-landing-container',
  templateUrl: './players-landing-container.component.html',
  styleUrls: ['./players-landing-container.component.scss'],
})
export class PlayersLandingContainerComponent {
  playerEntities: Observable<PlayerEntity[]>;

  constructor(
    private playersService: PlayersService,
    private dialog: MatDialog
  ) {
    this.playerEntities = playersService.getPlayerEntities();
  }

  async addNewPlayer() {
    const result = await this.dialog
      .open<EditPlayerModalComponent, any, PlayerDoc>(
        EditPlayerModalComponent,
        {
          width: '400px',
          height: '225px',
        }
      )
      .afterClosed()
      .pipe(take(1))
      .toPromise();

    if (result) {
      this.playersService.addNewPlayer(result);
    }
  }

  async editPlayer(player: PlayerEntity) {
    const result = await this.dialog
      .open<EditPlayerModalComponent, any, PlayerDoc>(
        EditPlayerModalComponent,
        {
          width: '400px',
          height: '225px',
          data: player,
        }
      )
      .afterClosed()
      .pipe(take(1))
      .toPromise();

    if (result) {
      this.playersService.updatePlayer(player.referenceId, result);
    }
  }

  async deletePlayer(player: PlayerEntity) {
    const result = await this.dialog
      .open<DeletePlayerConfirmationModalComponent, any, boolean>(
        DeletePlayerConfirmationModalComponent,
        {
          width: '400px',
          height: '200px',
          data: player,
        }
      )
      .afterClosed()
      .pipe(take(1))
      .toPromise();

    if (result) {
      this.playersService.deletePlayer(player.referenceId);
    }
  }
}
