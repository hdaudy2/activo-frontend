import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserlocationTabComponent } from './userlocation-tab.component';

describe('UserlocationTabComponent', () => {
  let component: UserlocationTabComponent;
  let fixture: ComponentFixture<UserlocationTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserlocationTabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserlocationTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
