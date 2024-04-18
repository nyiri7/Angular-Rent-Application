import { Component } from '@angular/core';
import { IVehicle } from '../../dataTypes/models';
import { Router, RouterModule } from '@angular/router';
import { VehicleServiceService } from '../services/vehicle-service.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-flotta',
  standalone: true,
  imports: [RouterModule,FormsModule],
  templateUrl: './flotta.component.html',
  styleUrl: './flotta.component.css',
})
export class FlottaComponent {
  vehicles: IVehicle[] = [];
  filteredvehicles: IVehicle[] = [];
  viewVar: number = 1;

  //filter
  brands: string[] =[];
  types: string[] =[];
  selectedbrand: string = "";
  selectedtype: string = "";

  constructor(
    private router: Router,
    private vehicleService: VehicleServiceService
  ) {}

  ngOnInit(): void {
    this.vehicleService.getAll().subscribe({
      next: (vehicles) => {
        this.vehicles = vehicles;
        this.filteredvehicles = this.vehicles;
        this.brands = this.vehicles.map(vehicle => vehicle.brand);
        this.types = this.vehicles.map(vehicle => vehicle.type);
      },
      error: (err) => console.error(err),
    });
  }

  filter(){
    if(!(this.vehicles.length == 0)){
      this.filteredvehicles = this.vehicles.filter((vehicle)=>{
        console.log(vehicle.brand +", "+ vehicle.type)
        return ((vehicle.brand === this.selectedbrand) || this.selectedbrand ==="") && ((vehicle.type === this.selectedtype) || this.selectedtype ==="")
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
        console.error(err);
      },
    });
  }
}
