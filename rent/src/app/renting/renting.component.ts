import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VehicleServiceService } from '../services/vehicle-service.service';
import { ICustomer, IRent, IVehicle } from '../../dataTypes/models';
import { CustomerService } from '../services/customer.service';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RentService } from '../services/rent.service';

@Component({
  selector: 'app-renting',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './renting.component.html',
  styleUrl: './renting.component.css'
})
export class RentingComponent implements OnInit {
  rentForm = this.formBuilder.group({
    vehicleId: this.formBuilder.control(0),
    customerId: this.formBuilder.control(0),
  });
  vehicles: IVehicle[]=[];
  customers: ICustomer[] = [];

  constructor(
    private router: Router,
    private vehicleService: VehicleServiceService,
    private CustomerService: CustomerService,
    private formBuilder: FormBuilder,
    private rentService: RentService
  ) {}

  ngOnInit(): void {
    this.CustomerService.getAll().subscribe({
      next: (customer) => {
        this.customers = customer;
        console.log(this.customers);
      },
      error: (err) => console.error(err)
    });
    this.vehicleService.getAll().subscribe({
      next: (vehicle) => {
        this.vehicles = vehicle.filter(vehicleI =>  !(vehicleI.status === "Kölcsönzött"));
        console.log(vehicle);
      },
      error: (err) => console.error(err),
    })
  };


  save() {
    console.log(this.rentForm.value.vehicleId)
    if(this.rentForm.value.vehicleId && this.rentForm.value.customerId){
      this.rentService.create(this.rentForm.value.vehicleId,this.rentForm.value.customerId).subscribe({
        next: () => {
          console.log("Siker!")
        },
        error: (err) => {
          console.error(err);
          console.log("Nem jó")
        }
      })}
    }

}
