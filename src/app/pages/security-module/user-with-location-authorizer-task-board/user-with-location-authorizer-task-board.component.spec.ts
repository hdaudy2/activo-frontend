import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserWithLocationAuthorizerTaskBoardComponent } from './user-with-location-authorizer-task-board.component';

describe('UserWithLocationAuthorizerTaskBoardComponent', () => {
  let component: UserWithLocationAuthorizerTaskBoardComponent;
  let fixture: ComponentFixture<UserWithLocationAuthorizerTaskBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserWithLocationAuthorizerTaskBoardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserWithLocationAuthorizerTaskBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
