import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import {
  ParticipatingTeam,
  ParticipatingTeamEntity,
  TournamentDoc,
  TournamentEntity,
  TournamentWithParticipatingTeams,
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

  getTournamentWithParticipatingTeams(
    referenceId: string
  ): Observable<TournamentWithParticipatingTeams | null> {
    return combineLatest([
      this.getTournamentEntity(referenceId),
      this.getParticipatingTeamsInTournament(referenceId),
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

  getParticipatingTeamsInTournament(
    referenceId: string
  ): Observable<ParticipatingTeamEntity[]> {
    return this.firestore
      .collection<ParticipatingTeam>(
        `${tournamentsCollection}/${referenceId}/${participatingTeamsCollection}`
      )
      .valueChanges({ idField: 'referenceId' });
  }

  addTeamToTournamentParticipants(tournamentId: string, teamId: string) {
    return this.firestore
      .collection(
        `${tournamentsCollection}/${tournamentId}/${participatingTeamsCollection}`
      )
      .add({ teamId });
  }

  removeTeamFromTournamentParticipants(tournamentId: string, teamId: string) {
    return this.firestore
      .doc(
        `${tournamentsCollection}/${tournamentId}/${participatingTeamsCollection}/${teamId}`
      )
      .delete();
  }

  setTourneyToLive(referenceId: string) {
    return this.firestore
      .doc(`${tournamentsCollection}/${referenceId}`)
      .update({
        live: true,
      });
  }

  addNewTournament(tournament: TournamentDoc) {
    return this.firestore
      .collection<TournamentDoc>(tournamentsCollection)
      .add(tournament);
  }

  updateTournament(referenceId: string, tournament: TournamentDoc) {
    return this.firestore
      .doc<TournamentDoc>(`${tournamentsCollection}/${referenceId}`)
      .update(tournament);
  }

  deleteTournament(referenceId: string) {
    return this.firestore
      .doc<TournamentDoc>(`${tournamentsCollection}/${referenceId}`)
      .delete();
  }
}
