import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserWithLocationsComponent } from './user-with-locations.component';

describe('UserWithLocationsComponent', () => {
  let component: UserWithLocationsComponent;
  let fixture: ComponentFixture<UserWithLocationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserWithLocationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserWithLocationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
