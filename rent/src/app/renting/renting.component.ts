import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { VehicleServiceService } from '../services/vehicle-service.service';
import { ICustomer, IRent, IVehicle } from '../../dataTypes/models';
import { CustomerService } from '../services/customer.service';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RentService } from '../services/rent.service';

@Component({
  selector: 'app-renting',
  standalone: true,
  imports: [ReactiveFormsModule,RouterModule,FormsModule],
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

  brands: string[] =[];
  types: string[] =[];
  statuses: string[] = [];
  selectedbrand: string = "";
  selectedtype: string = "";
  search:string = "";
  seats:number =0;
  filteredvehicles: IVehicle[] = [];


  nation: string = "";
  search1: string = "";
  adress:string = "";
  nationalitys: string[] = [];
  BirthAdresses: string[] = [];
  filteredcustomers: ICustomer[] = [];

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
        this.filteredcustomers = this.customers;
        this.nationalitys = this.customers.map(customer => customer.nationality);
        this.BirthAdresses = this.customers.map(customer => customer.birthAdress);
      },
      error: (err) => console.error(err)
    });
    this.vehicleService.getAll().subscribe({
      next: (vehicle) => {
        this.vehicles = vehicle.filter(vehicleI =>  !(vehicleI.status === "Kölcsönzött"));
        this.filteredvehicles = this.vehicles;
        this.brands = this.vehicles.map(vehicle => vehicle.brand);
        this.types = this.vehicles.map(vehicle => vehicle.type);
      },
      error: (err) => console.error(err),
    })
  };


  save() {
    if(this.rentForm.value.vehicleId && this.rentForm.value.customerId){
      this.rentService.create(this.rentForm.value.vehicleId,this.rentForm.value.customerId).subscribe({
        next: () => {
          console.log("Siker!")
          this.vehicles.splice(this.vehicles.findIndex(vh => vh.id == this.rentForm.value.vehicleId), 1);
          this.rentForm.controls.vehicleId.reset();
        },
        error: (err) => {
          console.error(err);
          console.log("Nem jó")
        }
      })}
    }

    
  filter(){
    if(!(this.vehicles.length == 0)){
      this.filteredvehicles = this.vehicles.filter((vehicle)=>{
        return ((vehicle.brand === this.selectedbrand) || this.selectedbrand ==="") && ((vehicle.type === this.selectedtype) || this.selectedtype ==="") && 
        ((vehicle.model.toLowerCase().includes(this.search.toLowerCase())) || (vehicle.plateNumber.toLowerCase().includes(this.search.toLowerCase())) || (vehicle.vehicleIdentificationNumber.toLowerCase().includes(this.search.toLowerCase())) || this.search ==="") && ((vehicle.seats >= this.seats) || this.seats ===0)
      } );
      this.rentForm.controls.vehicleId.reset()

    }
  }

  filtercustomer(){
    if(!(this.customers.length == 0)){
      this.filteredcustomers = this.customers.filter((customer)=>{
        return ((customer.idCardNumber.toLowerCase().includes(this.search.toLowerCase()) || customer.email.toLowerCase().includes(this.search.toLowerCase()) ||
        customer.mothersName.toLowerCase().includes(this.search1.toLowerCase())||
        (customer.firstName+" "+customer.lastName).toLowerCase().includes(this.search1.toLowerCase())||
        (customer.lastName+" "+customer.firstName).toLowerCase().includes(this.search1.toLowerCase())) || this.search1 ==="") &&
        ((customer.birthAdress===this.adress)||this.adress==="") && ((customer.nationality===this.nation)||this.nation==="")
      } );
      this.rentForm.controls.customerId.reset()
    }
  }

}
