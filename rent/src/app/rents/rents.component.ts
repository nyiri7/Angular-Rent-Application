import { Component, OnInit } from '@angular/core';
import { RentService } from '../services/rent.service';
import { IRent, IVehicle } from '../../dataTypes/models';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-rents',
  standalone: true,
  imports: [RouterModule,FormsModule],
  templateUrl: './rents.component.html',
  styleUrl: './rents.component.css'
})
export class RentsComponent implements OnInit {

  rents: IRent[] = [];
  filteredrents : IRent[] = [];

  constructor(
    private Rentservice: RentService
  ){}

  vehicles: IVehicle[] = [];
  search: string = "";
  vehicleid: number =0;
  customerid: number =0;

  ngOnInit(): void {
    this.Rentservice.getAll().subscribe({
      next: (rent) => {
        this.rents = rent;
        this.vehicles = this.rents.map(rent=>rent.vehicle);
      },
      error: (err) => console.error(err),
    });
  }

  deleteRent(rent: IRent) {
    this.Rentservice.delete(rent.id).subscribe({
      next: () => {
        const index = this.rents.indexOf(rent);
        if (index > -1) {
          this.rents.splice(index, 1);
        }
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  filter(){
    if(!(this.vehicles.length == 0)){
      this.filteredrents = this.rents.filter((rent)=>{
        return ((rent.vehicle.id === this.vehicleid) || this.vehicleid ===0);
      } );

    }
  }
}
