import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentappComponent } from './paymentapp.component';

describe('PaymentappComponent', () => {
  let component: PaymentappComponent;
  let fixture: ComponentFixture<PaymentappComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PaymentappComponent]
    });
    fixture = TestBed.createComponent(PaymentappComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
