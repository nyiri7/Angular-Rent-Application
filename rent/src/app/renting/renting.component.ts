import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { VehicleServiceService } from '../services/vehicle-service.service';
import { ICustomer, IRent, IVehicle } from '../../dataTypes/models';
import { CustomerService } from '../services/customer.service';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RentService } from '../services/rent.service';
import { NgbPagination } from '@ng-bootstrap/ng-bootstrap';
import { ToastService } from '../services/toast.service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-renting',
  standalone: true,
  imports: [ReactiveFormsModule,RouterModule,FormsModule,NgbPagination,NgClass],
  templateUrl: './renting.component.html',
  styleUrl: './renting.component.css'
})
export class RentingComponent implements OnInit {
  rentForm = this.formBuilder.group({
    vehicleId: this.formBuilder.control(0,[Validators.required,Validators.min(1)]),
    customerId: this.formBuilder.control(0,[Validators.required,Validators.min(1)]),
  });
  vehicles: IVehicle[]=[];
  customers: ICustomer[] = [];
  page: number =1;
  pagesize:number = 10;
  pageCust: number =1;

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
    private rentService: RentService,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.CustomerService.getAll().subscribe({
      next: (customer) => {
        this.customers = customer;
        this.filteredcustomers = this.customers;
        this.nationalitys = Array.from(new Set(this.customers.map(customer => customer.nationality)));
        this.BirthAdresses = Array.from(new Set(this.customers.map(customer => customer.birthAdress)));
      },
      error: (err) => this.toastService.show("Error",err)
    });
    this.vehicleService.getAll().subscribe({
      next: (vehicle) => {
        this.vehicles = vehicle.filter(vehicleI =>  !(vehicleI.status === "Kölcsönzött"));
        this.filteredvehicles = this.vehicles;
        this.brands = Array.from(new Set(this.vehicles.map(vehicle => vehicle.brand)));
        this.types = Array.from(new Set(this.vehicles.map(vehicle => vehicle.type)));
      },
      error: (err) => this.toastService.show("Error",err),
    })
  };


  save() {
    if(this.rentForm.valid){
      if(this.rentForm.value.vehicleId && this.rentForm.value.customerId){
        this.rentService.create(this.rentForm.value.vehicleId,this.rentForm.value.customerId).subscribe({
          next: () => {
            this.toastService.show("Mentés","Sikeres mentés!")
            this.vehicles.splice(this.vehicles.findIndex(vh => vh.id == this.rentForm.value.vehicleId), 1);
            this.filter()
            this.rentForm.controls.vehicleId.reset();
          },
          error: (err) => {
            console.error(err);
            this.toastService.show("Error",err)
          }
        })}
    }else{
      for (const key of Object.keys(this.rentForm.controls)) {
        this.rentForm.get(key)?.markAsTouched();
      }
      this.toastService.show("Hiba","Add meg a bérlőt és a bérlendő járművet!")
    }

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
