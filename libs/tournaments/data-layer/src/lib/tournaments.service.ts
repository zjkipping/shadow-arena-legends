import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import {
  TournamentDoc,
  TournamentEntity,
  TournamentsWithParticipatingTeamsEntity,
} from '../types';

const tournamentsCollection = 'tournaments';
const participatingTeamsCollection = 'participatingTeams';

@Injectable({
  providedIn: 'root',
})
export class TournamentsService {
  constructor(private firestore: AngularFirestore) {}

  getTournamentEntities(): Observable<TournamentEntity[]> {
    return this.firestore
      .collection<TournamentDoc>(tournamentsCollection)
      .valueChanges({ idField: 'referenceId' });
  }

  getTournamentEntitiesOnce(): Observable<TournamentEntity[]> {
    return this.firestore
      .collection<TournamentDoc>(tournamentsCollection)
      .get()
      .pipe(
        map((snapshot) =>
          snapshot.docs.map((doc) => ({
            referenceId: doc.id,
            ...(doc.data() as TournamentDoc),
          }))
        )
      );
  }

  getTournamentEntity(
    referenceId: string
  ): Observable<TournamentEntity | null> {
    return this.firestore
      .doc<TournamentDoc>(`${tournamentsCollection}/${referenceId}`)
      .valueChanges()
      .pipe(
        map((tourney) => {
          if (tourney) {
            return { ...tourney, referenceId };
          } else {
            return null;
          }
        })
      );
  }

  getTournamentWithParticipantsTeams(
    referenceId: string
  ): Observable<TournamentsWithParticipatingTeamsEntity | null> {
    return combineLatest([
      this.getTournamentEntity(referenceId),
      this.firestore
        .collection(
          `${tournamentsCollection}/${referenceId}/${participatingTeamsCollection}`
        )
        .valueChanges({ idField: 'referenceId' }),
    ]).pipe(
      map(([tournament, participatingTeams]) => {
        if (tournament) {
          return {
            ...tournament,
            participatingTeams,
          };
        } else {
          return null;
        }
      })
    );
  }

  addNewTournament(tournament: TournamentDoc) {
    return this.firestore
      .collection<TournamentDoc>(tournamentsCollection)
      .add(tournament);
  }

  updateTournament(referenceId: string, tournament: TournamentDoc) {
    this.firestore
      .doc<TournamentDoc>(`${tournamentsCollection}/${referenceId}`)
      .update(tournament);
  }

  deleteTournament(referenceId: string) {
    this.firestore
      .doc<TournamentDoc>(`${tournamentsCollection}/${referenceId}`)
      .delete();
  }
}