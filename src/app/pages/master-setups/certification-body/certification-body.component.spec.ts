import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CertificationBodyComponent } from './certification-body.component';

describe('CertificationBodyComponent', () => {
  let component: CertificationBodyComponent;
  let fixture: ComponentFixture<CertificationBodyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CertificationBodyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CertificationBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
