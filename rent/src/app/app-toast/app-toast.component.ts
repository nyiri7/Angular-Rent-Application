import { Component } from '@angular/core';
import { ToastService } from '../services/toast.service';
import { NgbAlert, NgbToast } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-app-toast',
  standalone: true,
  imports: [NgbToast,NgbAlert],
  templateUrl: './app-toast.component.html',
  styleUrl: './app-toast.component.css'
})
export class AppToastComponent {
  constructor(public toastService: ToastService) {}
}
