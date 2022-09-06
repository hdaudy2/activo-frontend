import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientSitesComponent } from './client-sites.component';

describe('ClientSitesComponent', () => {
  let component: ClientSitesComponent;
  let fixture: ComponentFixture<ClientSitesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientSitesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientSitesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
