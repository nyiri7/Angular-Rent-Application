import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { HistoryService } from '../services/history.service';
import { IHistory } from '../../dataTypes/models';
import { FormsModule } from '@angular/forms';
import { NgbPagination } from '@ng-bootstrap/ng-bootstrap';
import { SlicePipe } from '@angular/common';

@Component({
  selector: 'app-hystorys',
  standalone: true,
  imports: [RouterModule,FormsModule,NgbPagination,SlicePipe],
  templateUrl: './hystorys.component.html',
  styleUrl: './hystorys.component.css'
})
export class HystorysComponent {
  constructor(
    private router: Router,
    private historyService: HistoryService
  ) {}

  historys: IHistory[] = [];
  filteredhitory: IHistory[] =[];
  selectedType: string = "";
  search: string = "";
  types: string[] =[];
  page: number =1;
  pagesize:number = 10


  ngOnInit(): void {
    this.historyService.getAll().subscribe({
      next: (history) => {
        this.historys = history;
        this.filteredhitory = history;
        this.types = Array.from(new Set(this.historys.map(vehicle => vehicle.historyType)));
      },
      error: (err) => console.error(err),
    });
  }


  filter(){
    if(!(this.historys.length == 0)){
      this.filteredhitory = this.historys.filter((history)=>{
        return ((history.historyType === this.selectedType) || this.selectedType ==="") && ((history.Desc.toLowerCase().includes(this.search.toLowerCase()) || (history.vehicle.model +" "+history.vehicle.model).toLowerCase().includes(this.search.toLowerCase()) || history.vehicle.plateNumber.toLowerCase().includes(this.search.toLowerCase()) || history.vehicle.vehicleIdentificationNumber.toLowerCase().includes(this.search.toLowerCase()) ) || this.search == "")
      } );

    }
  }



}
