import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationTypeComponent } from './application-type.component';

describe('ApplicationTypeComponent', () => {
  let component: ApplicationTypeComponent;
  let fixture: ComponentFixture<ApplicationTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApplicationTypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
