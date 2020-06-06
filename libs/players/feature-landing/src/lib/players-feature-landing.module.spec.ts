import { async, TestBed } from '@angular/core/testing';
import { PlayersFeatureLandingModule } from './players-feature-landing.module';

describe('PlayersFeatureLandingModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [PlayersFeatureLandingModule],
    }).compileComponents();
  }));

  it('should create', () => {
    expect(PlayersFeatureLandingModule).toBeDefined();
  });
});
