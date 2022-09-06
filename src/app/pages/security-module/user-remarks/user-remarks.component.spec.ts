import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserRemarksComponent } from './user-remarks.component';

describe('UserRemarksComponent', () => {
  let component: UserRemarksComponent;
  let fixture: ComponentFixture<UserRemarksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserRemarksComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserRemarksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
