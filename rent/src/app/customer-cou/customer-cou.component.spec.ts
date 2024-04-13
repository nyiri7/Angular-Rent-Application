import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerCOUComponent } from './customer-cou.component';

describe('CustomerCOUComponent', () => {
  let component: CustomerCOUComponent;
  let fixture: ComponentFixture<CustomerCOUComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerCOUComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CustomerCOUComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
