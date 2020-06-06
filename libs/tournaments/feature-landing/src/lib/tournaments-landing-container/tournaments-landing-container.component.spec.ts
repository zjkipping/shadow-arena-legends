import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TournamentsLandingContainerComponent } from './tournaments-landing-container.component';

describe('TournamentsLandingContainerComponent', () => {
  let component: TournamentsLandingContainerComponent;
  let fixture: ComponentFixture<TournamentsLandingContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TournamentsLandingContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TournamentsLandingContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
