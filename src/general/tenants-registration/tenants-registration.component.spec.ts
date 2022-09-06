import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TenantsRegistrationComponent } from './tenants-registration.component';

describe('TenantsRegistrationComponent', () => {
  let component: TenantsRegistrationComponent;
  let fixture: ComponentFixture<TenantsRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TenantsRegistrationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TenantsRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
