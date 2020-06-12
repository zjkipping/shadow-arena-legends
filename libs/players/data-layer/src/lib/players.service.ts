import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import { combineLatest, Observable, of } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';

import { TypeAheadOption } from '@shadow-arena-legends/shared/util-types';

import {
  PlayerDoc,
  PlayerEntity,
  PlayerForList,
  PlayerStatsDoc,
  PlayerStatsForTourney,
} from '../types';

const playersCollection = 'players';
const teamReferencesCollection = 'teamRefs';
const statsCollection = 'stats';

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

  getPlayerEntity(referenceId: string): Observable<PlayerEntity | null> {
    return this.firestore
      .doc<PlayerDoc>(`${playersCollection}/${referenceId}`)
      .valueChanges()
      .pipe(
        map((player) => {
          if (!!player) {
            return {
              ...player,
              referenceId,
            };
          } else {
            return null;
          }
        })
      );
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
        !players.length
          ? of([])
          : combineLatest(
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

  getPlayerStatsForTourney(
    playerId: string,
    tourneyId: string
  ): Observable<PlayerStatsForTourney | null> {
    return this.getPlayerEntity(playerId).pipe(
      switchMap((player) => {
        if (!!player) {
          return this.firestore
            .doc<PlayerStatsDoc>(
              `${playersCollection}/${playerId}/${statsCollection}/${tourneyId}`
            )
            .valueChanges()
            .pipe(
              map((stats) => ({
                name: player.name,
                playerId,
                tourneyId,
                kills: stats?.kills || 0,
              }))
            );
        } else {
          return of(null);
        }
      })
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

  incrementKillsStat(playerId: string, tournamentId: string) {
    return this.firestore
      .doc(
        `${playersCollection}/${playerId}/${statsCollection}/${tournamentId}`
      )
      .update({
        kills: firebase.firestore.FieldValue.increment(1),
      });
  }

  decrementKillsStat(playerId: string, tournamentId: string) {
    return this.firestore
      .doc(
        `${playersCollection}/${playerId}/${statsCollection}/${tournamentId}`
      )
      .update({
        kills: firebase.firestore.FieldValue.increment(-1),
      });
  }

  initializeStatsForTourney(playerId: string, tournamentId: string) {
    return this.firestore
      .doc(
        `${playersCollection}/${playerId}/${statsCollection}/${tournamentId}`
      )
      .set({
        kills: 0,
      });
  }

  removeStatsForTourney(playerId: string, tournamentId: string) {
    return this.firestore
      .doc(
        `${playersCollection}/${playerId}/${statsCollection}/${tournamentId}`
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
