import { PlayerStatsForTourney } from '@shadow-arena-legends/players/data-layer';
import { TeamStatsForTourney } from '@shadow-arena-legends/teams/data-layer';

export interface TeamStatsForList extends TeamStatsForTourney {
  members: PlayerStatsForTourney[];
}
