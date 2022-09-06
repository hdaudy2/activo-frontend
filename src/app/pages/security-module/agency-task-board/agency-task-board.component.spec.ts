import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgencyTaskBoardComponent } from './agency-task-board.component';

describe('AgencyTaskBoardComponent', () => {
  let component: AgencyTaskBoardComponent;
  let fixture: ComponentFixture<AgencyTaskBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgencyTaskBoardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgencyTaskBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
