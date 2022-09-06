import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserWithLocationsTaskBoardComponent } from './user-with-locations-task-board.component';

describe('UserWithLocationsTaskBoardComponent', () => {
  let component: UserWithLocationsTaskBoardComponent;
  let fixture: ComponentFixture<UserWithLocationsTaskBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserWithLocationsTaskBoardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserWithLocationsTaskBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
