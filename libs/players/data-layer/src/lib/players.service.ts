import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

import { TypeAheadOption } from '@shadow-arena-legends/shared/util-types';

import { PlayerDoc, PlayerEntity } from '../types';

const playersCollection = 'players';

@Injectable({
  providedIn: 'root',
})
export class PlayersService {
  constructor(private firestore: AngularFirestore) {}

  async getPlayerEntityOnce(referenceId: string): Promise<PlayerEntity | null> {
    const doc = await this.firestore
      .doc<PlayerDoc>(`${playersCollection}/${referenceId}`)
      .get()
      .pipe(take(1))
      .toPromise();
    if (doc.exists) {
      return {
        ...(doc.data() as PlayerDoc),
        referenceId,
      };
    } else {
      return null;
    }
  }

  getPlayerEntities(): Observable<PlayerEntity[]> {
    return this.firestore
      .collection<PlayerDoc>(playersCollection)
      .valueChanges({ idField: 'referenceId' });
  }

  getPlayerEntitiesOnce(): Observable<PlayerEntity[]> {
    return this.firestore
      .collection<PlayerDoc>(playersCollection)
      .get()
      .pipe(
        map((snapshot) =>
          snapshot.docs.map((doc) => ({
            referenceId: doc.id,
            ...(doc.data() as PlayerDoc),
          }))
        )
      );
  }

  getPlayersForMemberTypeAhead(): Observable<TypeAheadOption[]> {
    return this.getPlayerEntitiesOnce().pipe(
      map((players) =>
        players.map((player) => ({
          name: player.name,
          referenceId: player.referenceId,
        }))
      )
    );
  }

  addNewPlayer(player: PlayerDoc) {
    return this.firestore.collection<PlayerDoc>(playersCollection).add(player);
  }

  updatePlayer(referenceId: string, player: PlayerDoc) {
    this.firestore
      .doc<PlayerDoc>(`${playersCollection}/${referenceId}`)
      .update(player);
  }

  deletePlayer(referenceId: string) {
    this.firestore
      .doc<PlayerDoc>(`${playersCollection}/${referenceId}`)
      .delete();
  }
}
