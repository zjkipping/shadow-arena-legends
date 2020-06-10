import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { combineLatest, Observable } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';

import { TypeAheadOption } from '@shadow-arena-legends/shared/util-types';

import { PlayerDoc, PlayerEntity, PlayerForList } from '../types';

const playersCollection = 'players';
const teamReferencesCollection = 'teamRefs';

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

  // TODO: realistically a count variable should be incremented/decremented on the player doc
  // using cloud functions.
  // I'm just too lazy to set that up right now
  getPlayersForTable(): Observable<PlayerForList[]> {
    return this.getPlayerEntities().pipe(
      switchMap((players) =>
        combineLatest(
          players.map((player) =>
            this.getPlayerTeamReferences(player.referenceId).pipe(
              map((refs) => ({ ...player, canDelete: refs.length === 0 }))
            )
          )
        )
      )
    );
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

  getPlayerTeamReferences(referenceId: string): Observable<string[]> {
    return this.firestore
      .collection(
        `${playersCollection}/${referenceId}/${teamReferencesCollection}`
      )
      .valueChanges({ idField: 'ref' })
      .pipe(map((teamRefs) => teamRefs.map((tr) => tr.ref)));
  }

  addTeamReferenceToPlayer(playerId: string, teamId: string) {
    return this.firestore
      .doc(
        `${playersCollection}/${playerId}/${teamReferencesCollection}/${teamId}`
      )
      .set({});
  }

  removeTeamReferenceFromPlayer(playerId: string, teamId: string) {
    return this.firestore
      .doc(
        `${playersCollection}/${playerId}/${teamReferencesCollection}/${teamId}`
      )
      .delete();
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
