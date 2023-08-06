import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CleaningRatesComponent } from './cleaning-rates.component';

describe('CleaningRatesComponent', () => {
  let component: CleaningRatesComponent;
  let fixture: ComponentFixture<CleaningRatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CleaningRatesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CleaningRatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
