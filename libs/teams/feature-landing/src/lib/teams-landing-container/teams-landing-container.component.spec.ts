import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamsLandingContainerComponent } from './teams-landing-container.component';

describe('TeamsLandingContainerComponent', () => {
  let component: TeamsLandingContainerComponent;
  let fixture: ComponentFixture<TeamsLandingContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamsLandingContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamsLandingContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
