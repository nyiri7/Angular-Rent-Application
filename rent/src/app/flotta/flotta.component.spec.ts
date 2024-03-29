import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlottaComponent } from './flotta.component';

describe('FlottaComponent', () => {
  let component: FlottaComponent;
  let fixture: ComponentFixture<FlottaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FlottaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FlottaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
