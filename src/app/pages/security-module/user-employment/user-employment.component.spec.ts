import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserEmploymentComponent } from './user-employment.component';

describe('UserEmploymentComponent', () => {
  let component: UserEmploymentComponent;
  let fixture: ComponentFixture<UserEmploymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserEmploymentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserEmploymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
