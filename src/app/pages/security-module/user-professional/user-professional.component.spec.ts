import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserProfessionalComponent } from './user-professional.component';

describe('UserProfessionalComponent', () => {
  let component: UserProfessionalComponent;
  let fixture: ComponentFixture<UserProfessionalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserProfessionalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserProfessionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
