import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectRemarksComponent } from './project-remarks.component';

describe('ProjectRemarksComponent', () => {
  let component: ProjectRemarksComponent;
  let fixture: ComponentFixture<ProjectRemarksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectRemarksComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectRemarksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
