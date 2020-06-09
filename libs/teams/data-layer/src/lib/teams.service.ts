import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { combineLatest, Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { TypeAheadOption } from '@shadow-arena-legends/shared/util-types';
import { TournamentType } from '@shadow-arena-legends/tournaments/data-layer';

import {
  TeamDoc,
  TeamEntity,
  TeamMember,
  TeamMemberEntity,
  TeamWithMembers,
} from '../types';

const teamsCollection = 'teams';
const membersCollection = 'members';

@Injectable({
  providedIn: 'root',
})
export class TeamsService {
  constructor(private firestore: AngularFirestore) {}

  getTeamEntity(referenceId: string): Observable<TeamEntity | null> {
    return this.firestore
      .doc<TeamDoc>(`${teamsCollection}/${referenceId}`)
      .valueChanges()
      .pipe(
        map((team) => {
          if (team) {
            return { ...team, referenceId };
          } else {
            return null;
          }
        })
      );
  }

  getTeamEntities(): Observable<TeamEntity[]> {
    return this.firestore
      .collection<TeamDoc>(teamsCollection)
      .valueChanges({ idField: 'referenceId' });
  }

  getTeamMembers(teamId: string): Observable<TeamMemberEntity[]> {
    return this.firestore
      .collection<TeamMember>(
        `${teamsCollection}/${teamId}/${membersCollection}`
      )
      .valueChanges({ idField: 'referenceId' });
  }

  getTeamsWithMembers(): Observable<TeamWithMembers[]> {
    return this.getTeamEntities().pipe(
      switchMap((teams) =>
        !teams.length
          ? of([])
          : combineLatest(
              teams.map((team) =>
                this.getTeamMembers(team.referenceId).pipe(
                  map((members) => ({ ...team, members }))
                )
              )
            )
      )
    );
  }

  getTeamsForTypeAhead(
    tournamentType: TournamentType
  ): Observable<TypeAheadOption[]> {
    return this.firestore
      .collection<TeamDoc>(teamsCollection, (ref) =>
        ref.where('type', '==', tournamentType)
      )
      .valueChanges({ idField: 'referenceId' })
      .pipe(
        map((teams) =>
          teams.map((team) => ({
            name: team.name,
            referenceId: team.referenceId,
          }))
        )
      );
  }

  addNewTeam(player: TeamDoc) {
    return this.firestore.collection<TeamDoc>(teamsCollection).add(player);
  }

  updateTeam(referenceId: string, player: TeamDoc) {
    this.firestore
      .doc<TeamDoc>(`${teamsCollection}/${referenceId}`)
      .update(player);
  }

  deleteTeam(referenceId: string) {
    this.firestore.doc<TeamDoc>(`${teamsCollection}/${referenceId}`).delete();
  }

  addMember(referenceId: string, playerId: string) {
    this.firestore
      .collection(`${teamsCollection}/${referenceId}/${membersCollection}`)
      .add({ playerId });
  }

  removeMember(referenceId: string, memberId: string) {
    this.firestore
      .doc(`${teamsCollection}/${referenceId}/${membersCollection}/${memberId}`)
      .delete();
  }
}
