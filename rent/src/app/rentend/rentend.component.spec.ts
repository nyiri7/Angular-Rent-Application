import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RentendComponent } from './rentend.component';

describe('RentendComponent', () => {
  let component: RentendComponent;
  let fixture: ComponentFixture<RentendComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RentendComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RentendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
