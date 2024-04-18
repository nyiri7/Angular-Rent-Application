import { Component, OnInit } from '@angular/core';
import { RentService } from '../services/rent.service';
import { IRent } from '../../dataTypes/models';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-rents',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './rents.component.html',
  styleUrl: './rents.component.css'
})
export class RentsComponent implements OnInit {

  rents: IRent[] = [];

  constructor(
    private Rentservice: RentService
  ){}




  ngOnInit(): void {
    this.Rentservice.getAll().subscribe({
      next: (rent) => {
        this.rents = rent;
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
}
