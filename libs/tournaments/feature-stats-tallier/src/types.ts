import {
  AbstractControlOptions,
  AsyncValidatorFn,
  FormControl,
  ValidatorFn,
} from '@angular/forms';

import { PlayerStatsForTourney } from '@shadow-arena-legends/players/data-layer';
import { FocusedTeamOption } from '@shadow-arena-legends/shared/util-types';
import { TeamStatsForTourney } from '@shadow-arena-legends/teams/data-layer';

export interface TeamStatsForList extends TeamStatsForTourney {
  members: PlayerStatsForTourney[];
}

export class FormControlWithTeam extends FormControl {
  constructor(
    public team: FocusedTeamOption,
    formState?: any,
    validatorOrOpts?:
      | ValidatorFn
      | ValidatorFn[]
      | AbstractControlOptions
      | null,
    asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[] | null
  ) {
    super(formState, validatorOrOpts, asyncValidator);
  }
}
