import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RolesWithPermissionAuthorizerComponent } from './roles-with-permission-authorizer.component';

describe('RolesWithPermissionAuthorizerComponent', () => {
  let component: RolesWithPermissionAuthorizerComponent;
  let fixture: ComponentFixture<RolesWithPermissionAuthorizerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RolesWithPermissionAuthorizerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RolesWithPermissionAuthorizerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
