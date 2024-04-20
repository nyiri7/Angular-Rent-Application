import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HystorysComponent } from './hystorys.component';

describe('HystorysComponent', () => {
  let component: HystorysComponent;
  let fixture: ComponentFixture<HystorysComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HystorysComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HystorysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
