import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QcDocumentComponent } from './qc-document.component';

describe('QcDocumentComponent', () => {
  let component: QcDocumentComponent;
  let fixture: ComponentFixture<QcDocumentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QcDocumentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QcDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
