import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RolesWithPermissionAuthorizerTaskBoardComponent } from './roles-with-permission-authorizer-task-board.component';

describe('RolesWithPermissionAuthorizerTaskBoardComponent', () => {
  let component: RolesWithPermissionAuthorizerTaskBoardComponent;
  let fixture: ComponentFixture<RolesWithPermissionAuthorizerTaskBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RolesWithPermissionAuthorizerTaskBoardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RolesWithPermissionAuthorizerTaskBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
