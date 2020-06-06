import { async, TestBed } from '@angular/core/testing';
import { PlayersUiPlayerListModule } from './players-ui-player-list.module';

describe('PlayersUiPlayerListModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [PlayersUiPlayerListModule],
    }).compileComponents();
  }));

  it('should create', () => {
    expect(PlayersUiPlayerListModule).toBeDefined();
  });
});
