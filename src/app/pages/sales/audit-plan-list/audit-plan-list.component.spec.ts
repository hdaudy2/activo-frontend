import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuditPlanListComponent } from './audit-plan-list.component';

describe('AuditPlanListComponent', () => {
  let component: AuditPlanListComponent;
  let fixture: ComponentFixture<AuditPlanListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuditPlanListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuditPlanListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
