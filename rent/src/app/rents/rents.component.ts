import { Component, OnInit } from '@angular/core';
import { RentService } from '../services/rent.service';
import { IRent, IVehicle } from '../../dataTypes/models';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SlicePipe } from '@angular/common';
import { NgbPagination } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-rents',
  standalone: true,
  imports: [RouterModule,FormsModule,SlicePipe,NgbPagination],
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
  page: number =1;
  pagesize:number = 10

  ngOnInit(): void {
    this.Rentservice.getAll().subscribe({
      next: (rent) => {
        console.log(rent);
        
        this.rents = rent;
        this.filteredrents=this.rents;
        this.vehicles = Array.from(new Set(this.rents.map(rent=>rent.vehicle)));
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
    if(!(this.rents.length == 0)){
      this.filteredrents = this.rents.filter((rent)=>{
        return ((rent.vehicle.id == this.vehicleid) || this.vehicleid ==0)&&
        (((rent.customer.firstName +" "+rent.customer.lastName).toLowerCase().includes(this.search.toLowerCase())) || this.vehicleid ==0);
      } );

    }
  }
}
