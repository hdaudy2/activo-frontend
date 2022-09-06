import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserStandardsComponent } from './user-standards.component';

describe('UserStandardsComponent', () => {
  let component: UserStandardsComponent;
  let fixture: ComponentFixture<UserStandardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserStandardsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserStandardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
