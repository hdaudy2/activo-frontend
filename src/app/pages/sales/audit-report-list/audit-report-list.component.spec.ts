import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuditReportListComponent } from './audit-report-list.component';

describe('AuditReportListComponent', () => {
  let component: AuditReportListComponent;
  let fixture: ComponentFixture<AuditReportListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuditReportListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuditReportListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
