import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CertificateTaskBoardComponent } from './certificate-task-board.component';

describe('CertificateTaskBoardComponent', () => {
  let component: CertificateTaskBoardComponent;
  let fixture: ComponentFixture<CertificateTaskBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CertificateTaskBoardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CertificateTaskBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
