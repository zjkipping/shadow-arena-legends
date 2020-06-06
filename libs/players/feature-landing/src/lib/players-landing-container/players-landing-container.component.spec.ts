import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayersLandingContainerComponent } from './players-landing-container.component';

describe('PlayersLandingContainerComponent', () => {
  let component: PlayersLandingContainerComponent;
  let fixture: ComponentFixture<PlayersLandingContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayersLandingContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayersLandingContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
