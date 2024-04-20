import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { HistoryService } from '../services/history.service';
import { IHistory } from '../../dataTypes/models';

@Component({
  selector: 'app-hystorys',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './hystorys.component.html',
  styleUrl: './hystorys.component.css'
})
export class HystorysComponent {
  constructor(
    private router: Router,
    private historyService: HistoryService
  ) {}

  historys: IHistory[] = [];

  ngOnInit(): void {
    this.historyService.getAll().subscribe({
      next: (history) => {
        this.historys = history;
      },
      error: (err) => console.error(err),
    });
  }
}
