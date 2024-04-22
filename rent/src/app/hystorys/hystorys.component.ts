import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { HistoryService } from '../services/history.service';
import { IHistory } from '../../dataTypes/models';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-hystorys',
  standalone: true,
  imports: [RouterModule,FormsModule],
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


  ngOnInit(): void {
    this.historyService.getAll().subscribe({
      next: (history) => {
        this.historys = history;
        this.filteredhitory = history;
        this.types = this.historys.map(vehicle => vehicle.historyType);
      },
      error: (err) => console.error(err),
    });
  }


  filter(){
    if(!(this.historys.length == 0)){
      this.filteredhitory = this.historys.filter((history)=>{
        return ((history.historyType === this.selectedType) || this.selectedType ==="")
      } );

    }
  }



}
