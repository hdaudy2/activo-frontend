import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QCMasterListComponent } from './qc-master-list.component';

describe('QCMasterListComponent', () => {
  let component: QCMasterListComponent;
  let fixture: ComponentFixture<QCMasterListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QCMasterListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QCMasterListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
