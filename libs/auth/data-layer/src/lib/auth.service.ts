import { Inject, Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { MatSnackBar } from '@angular/material/snack-bar';
import firebase from 'firebase/app';
import 'firebase/auth';
import { combineLatest, merge, Observable, of } from 'rxjs';
import {
  filter,
  map,
  mapTo,
  shareReplay,
  switchMap,
  take,
} from 'rxjs/operators';

import { ProfilesService } from '@shadow-arena-legends/profiles/data-layer';
import {
  Environment,
  ENVIRONMENT,
  EnvironmentType,
} from '@shadow-arena-legends/shared/util-types';

import { UserEntity, UserRole } from '../types';

import { RolesService } from './roles.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user: Observable<UserEntity | null>;

  constructor(
    private afAuth: AngularFireAuth,
    private rolesService: RolesService,
    private profilesService: ProfilesService,
    private snackbar: MatSnackBar,
    @Inject(ENVIRONMENT) env: Environment
  ) {
    this.user = this.afAuth.authState.pipe(
      map((a) => (env.type === EnvironmentType.Dev ? { uid: 'admin' } : a)),
      switchMap((a) => {
        if (a) {
          return combineLatest([
            this.profilesService.getProfile(a.uid),
            this.rolesService.getRole(a.uid),
          ]).pipe(
            map(([profile, role]) =>
              profile && role
                ? {
                    referenceId: a.uid,
                    ...profile,
                    ...role,
                  }
                : null
            )
          );
        } else {
          return of(null);
        }
      }),
      shareReplay({ refCount: true, bufferSize: 1 })
    );
  }

  registerWithEmailPassword(_email: string, _password: string) {
    // implement later when we want tourney participants to login through leaderboard app
  }

  loginWithEmailPassword(_email: string, _password: string) {
    // implement later when we want tourney participants to login through leaderboard app
  }

  async loginWithGoogle() {
    const { user } = await this.afAuth.signInWithPopup(
      new firebase.auth.GoogleAuthProvider()
    );
    if (user) {
      const profile = await this.profilesService.getProfileOnce(user.uid);
      if (!profile.exists) {
        // default the profile & roles for a new google sign in
        // could be done as a cloud function (consider moving after MVP)
        this.profilesService.setProfile(user.uid, {
          name: user.email?.split('@')[0] || '',
          email: user.email || '',
        });
        this.rolesService.setRole(user.uid, UserRole.Player);
      }

      return merge(of(null), this.user)
        .pipe(
          filter((u) => !!u),
          take(1),
          mapTo(true)
        )
        .toPromise();
    } else {
      // unable to sign in?
      this.snackbar.open('Unable to login... Please try again later.', 'X', {
        duration: 5000,
      });
      return Promise.resolve(false);
    }
  }

  async logout() {
    await this.afAuth.signOut();
    return merge(of({}), this.user)
      .pipe(
        filter((u) => !u),
        take(1)
      )
      .toPromise();
  }
}
