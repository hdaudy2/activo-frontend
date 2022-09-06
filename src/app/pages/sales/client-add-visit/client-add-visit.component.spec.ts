import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientAddVisitComponent } from './client-add-visit.component';

describe('ClientAddVisitComponent', () => {
  let component: ClientAddVisitComponent;
  let fixture: ComponentFixture<ClientAddVisitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientAddVisitComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientAddVisitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
