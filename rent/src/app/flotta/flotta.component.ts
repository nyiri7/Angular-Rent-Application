import { Component } from '@angular/core';
import { IVehicle } from '../../dataTypes/models';
import { Router, RouterModule } from '@angular/router';
import { VehicleServiceService } from '../services/vehicle-service.service';

@Component({
  selector: 'app-flotta',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './flotta.component.html',
  styleUrl: './flotta.component.css',
})
export class FlottaComponent {
  vehicles: IVehicle[] = [];
  viewVar: number = 1;

  constructor(
    private router: Router,
    private vehicleService: VehicleServiceService
  ) {}

  ngOnInit(): void {
    this.vehicleService.getAll().subscribe({
      next: (vehicles) => {
        this.vehicles = vehicles;
        console.log(vehicles);
      },
      error: (err) => console.error(err),
    });
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
