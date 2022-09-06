import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectAmountReportsComponent } from './project-amount-reports.component';

describe('ProjectAmountReportsComponent', () => {
  let component: ProjectAmountReportsComponent;
  let fixture: ComponentFixture<ProjectAmountReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectAmountReportsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectAmountReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
