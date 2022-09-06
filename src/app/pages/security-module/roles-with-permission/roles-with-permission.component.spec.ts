import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RolesWithPermissionComponent } from './roles-with-permission.component';

describe('RolesWithPermissionComponent', () => {
  let component: RolesWithPermissionComponent;
  let fixture: ComponentFixture<RolesWithPermissionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RolesWithPermissionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RolesWithPermissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
