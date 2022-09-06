import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAcademicComponent } from './user-academic.component';

describe('UserAcademicComponent', () => {
  let component: UserAcademicComponent;
  let fixture: ComponentFixture<UserAcademicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserAcademicComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserAcademicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
