import { Component } from '@angular/core';
import { IVehicle } from '../../dataTypes/models';
import { Router, RouterModule } from '@angular/router';
import { VehicleServiceService } from '../services/vehicle-service.service';
import { FormsModule } from '@angular/forms';
import { SlicePipe } from '@angular/common';
import { NgbPagination } from '@ng-bootstrap/ng-bootstrap';
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'app-flotta',
  standalone: true,
  imports: [RouterModule,FormsModule,SlicePipe,NgbPagination],
  templateUrl: './flotta.component.html',
  styleUrl: './flotta.component.css',
})
export class FlottaComponent {
  vehicles: IVehicle[] = [];
  filteredvehicles: IVehicle[] = [];
  viewVar: number = 1;
  page: number =1;
  pagesize:number = 10


  //filter
  brands: string[] =[];
  types: string[] =[];
  statuses: string[] = [];
  selectedbrand: string = "";
  selectedtype: string = "";
  search:string = "";
  seats:number =0;
  status:string = "";

  constructor(
    private router: Router,
    private vehicleService: VehicleServiceService,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.vehicleService.getAll().subscribe({
      next: (vehicles) => {
        this.vehicles = vehicles;
        this.filteredvehicles = vehicles;
        this.brands = Array.from(new Set(this.vehicles.map(vehicle => vehicle.brand)));
        this.types = Array.from(new Set(this.vehicles.map(vehicle => vehicle.type)));
        this.statuses = Array.from(new Set(this.vehicles.map(vehicle => vehicle.status)));

      },
      error: (err) => console.error(err),
    });
  }

  filter(){
    if(!(this.vehicles.length == 0)){
      this.filteredvehicles = this.vehicles.filter((vehicle)=>{
        return ((vehicle.brand === this.selectedbrand) || this.selectedbrand ==="") && ((vehicle.type === this.selectedtype) || this.selectedtype ==="") && 
        ((vehicle.model.toLowerCase().includes(this.search.toLowerCase())) || (vehicle.plateNumber.toLowerCase().includes(this.search.toLowerCase())) || (vehicle.vehicleIdentificationNumber.toLowerCase().includes(this.search.toLowerCase())) || this.search ==="") && ((vehicle.seats >= this.seats) || this.seats ===0) && ((vehicle.status === this.status) || this.status ==="")
      } );

    }
  }

  switchView() {
    if (this.viewVar == 0) {
      this.viewVar = 1;
    } else {
      this.viewVar = 0;
    }
  }
  deleteVehicle(vehicle: IVehicle) {
    this.vehicleService.delete(vehicle.id).subscribe({
      next: () => {
        const index = this.vehicles.indexOf(vehicle);
        if (index > -1) {
          this.vehicles.splice(index, 1);
        }
      },
      error: (err) => {
        this.toastService.show("Hiba","Hiba történt a törlés során.")
      },
    });
  }
}
