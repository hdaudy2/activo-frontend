import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NaceCodeComponent } from './nace-code.component';

describe('NaceCodeComponent', () => {
  let component: NaceCodeComponent;
  let fixture: ComponentFixture<NaceCodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NaceCodeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NaceCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
