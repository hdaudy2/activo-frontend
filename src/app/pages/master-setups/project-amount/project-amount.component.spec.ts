import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectAmountComponent } from './project-amount.component';

describe('ProjectAmountComponent', () => {
  let component: ProjectAmountComponent;
  let fixture: ComponentFixture<ProjectAmountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectAmountComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectAmountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
