import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RolesWithPermissionTaskBoardComponent } from './roles-with-permission-task-board.component';

describe('RolesWithPermissionTaskBoardComponent', () => {
  let component: RolesWithPermissionTaskBoardComponent;
  let fixture: ComponentFixture<RolesWithPermissionTaskBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RolesWithPermissionTaskBoardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RolesWithPermissionTaskBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
