import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCpdComponent } from './user-cpd.component';

describe('UserCpdComponent', () => {
  let component: UserCpdComponent;
  let fixture: ComponentFixture<UserCpdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserCpdComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserCpdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
