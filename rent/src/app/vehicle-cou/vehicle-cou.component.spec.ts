import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleCOUComponent } from './vehicle-cou.component';

describe('VehicleCOUComponent', () => {
  let component: VehicleCOUComponent;
  let fixture: ComponentFixture<VehicleCOUComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VehicleCOUComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VehicleCOUComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
