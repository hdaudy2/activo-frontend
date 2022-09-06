import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserWithLocationAuthorizerComponent } from './user-with-location-authorizer.component';

describe('UserWithLocationAuthorizerComponent', () => {
  let component: UserWithLocationAuthorizerComponent;
  let fixture: ComponentFixture<UserWithLocationAuthorizerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserWithLocationAuthorizerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserWithLocationAuthorizerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
