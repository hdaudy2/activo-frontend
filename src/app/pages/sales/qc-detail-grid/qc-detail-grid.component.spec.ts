import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QCDetailGridComponent } from './qc-detail-grid.component';

describe('QCDetailGridComponent', () => {
  let component: QCDetailGridComponent;
  let fixture: ComponentFixture<QCDetailGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QCDetailGridComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QCDetailGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
