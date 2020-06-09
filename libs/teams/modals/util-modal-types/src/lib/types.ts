import { TypeAheadOption } from '@shadow-arena-legends/shared/util-types';
import {
  TeamDoc,
  TeamMemberWithName,
  TeamWithMembers,
} from '@shadow-arena-legends/teams/data-layer';

export interface EditTeamModalData {
  team: TeamWithMembers;
  members: TeamMemberWithName[];
}

export interface EditTeamModalResult {
  team: TeamDoc;
  membersToRemove?: TeamMemberWithName[];
  membersToAdd: TypeAheadOption[];
}
