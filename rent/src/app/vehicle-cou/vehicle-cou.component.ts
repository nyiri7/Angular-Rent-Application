import { Component, OnInit, } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { VehicleServiceService } from '../services/vehicle-service.service';
import { IHistory, IVehicle } from '../../dataTypes/models';
import { NgClass, formatDate } from '@angular/common';
import moment from 'moment';
import { HistoryService } from '../services/history.service';
import { ToastService } from '../services/toast.service';
import routes from '../app.routes';

@Component({
  selector: 'app-vehicle-cou',
  standalone: true,
  imports:[ReactiveFormsModule,NgClass],
  templateUrl: './vehicle-cou.component.html',
  styleUrl: './vehicle-cou.component.css'
})
export class VehicleCOUComponent implements OnInit{

  vehicleForm = this.formBuilder.group({
    id: this.formBuilder.control(0),

    brand: this.formBuilder.control("",Validators.required),

    model: this.formBuilder.control("",Validators.required),

    boughtfor: this.formBuilder.control(0,[Validators.required, Validators.min(1)]),

    actualprice: this.formBuilder.control(0,[Validators.required, Validators.min(1)]),

    boughtAt: this.formBuilder.control(new Date()),

    plateNumber: this.formBuilder.control("",Validators.required),

    km: this.formBuilder.control(0),

    seats: this.formBuilder.control(0,[Validators.required, Validators.min(1)]),

    kmprice: this.formBuilder.control(0,[Validators.required, Validators.min(1)]),

    vehicleIdentificationNumber: this.formBuilder.control("",Validators.required),

    type:this.formBuilder.control("Autó"),
    status:this.formBuilder.control("Elérhető")
  });
  
  constructor(private activatedRoute: ActivatedRoute,private router: Router,private formBuilder: FormBuilder,private vehicleService: VehicleServiceService,private historyService: HistoryService,private toastService: ToastService){}

  create : boolean = true;
  title: string ="";
  historys: IHistory[] = [];

  
  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params['id'];
    if(id){
      this.create=false;
      this.vehicleService.getOne(id).subscribe({
        next: (vehicle) => {
          this.vehicleForm.setValue(vehicle);
          this.title = vehicle.brand +" "+vehicle.model
        },
        error: (err) => {
          this.create=true;
          console.error(err);
        }
      });
      this.historyService.getByVehicle(id).subscribe({
        next: (hist) => {
          this.historys = hist;
        },
        error: (err) => {
          this.create=true;
          console.error(err);
        }
      });

    }
  }
  save() {
    if(this.vehicleForm.valid){
      const vehicle = this.vehicleForm.value as IVehicle;

      if (this.create) {
        this.vehicleService.create(vehicle).subscribe({
          next: () => {
            this.toastService.show("Mentés","Sikeres mentés!")
            this.router.navigate(['']);
          },
          error: (err) => {
            this.toastService.show("Error",err)
          }
        })
      }
      else {
        this.vehicleService.update(vehicle).subscribe({
          next: () => {
            this.toastService.show("Mentés","Sikeres mentés!")
          },
          error: (err) => {
            this.toastService.show("Error",err)
          }
        })
      }
    }else{
      for (const key of Object.keys(this.vehicleForm.controls)) {
        this.vehicleForm.get(key)?.markAsTouched();
      }
      this.toastService.show("Hiba","Töltsd ki az összes kötelező mezőt!")
    }

    
  }

}
