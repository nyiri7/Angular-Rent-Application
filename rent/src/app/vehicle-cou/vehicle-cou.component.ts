import { Component, OnInit, } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { VehicleServiceService } from '../services/vehicle-service.service';
import { IVehicle } from '../../dataTypes/models';

@Component({
  selector: 'app-vehicle-cou',
  standalone: true,
  imports:[ReactiveFormsModule],
  templateUrl: './vehicle-cou.component.html',
  styleUrl: './vehicle-cou.component.css'
})
export class VehicleCOUComponent implements OnInit{

  vehicleForm = this.formBuilder.group({
    id: this.formBuilder.control(0),

    brand: this.formBuilder.control(""),

    model: this.formBuilder.control(""),

    boughtfor: this.formBuilder.control(0),

    actualprice: this.formBuilder.control(0),

    boughtAt: this.formBuilder.control(new Date()),

    plateNumber: this.formBuilder.control(""),

    km: this.formBuilder.control(0),

    seats: this.formBuilder.control(0),

    kmprice: this.formBuilder.control(0),

    vehicleIdentificationNumber: this.formBuilder.control(""),

    type:this.formBuilder.control("Car")
  });
  
  constructor(private activatedRoute: ActivatedRoute,private formBuilder: FormBuilder,private vehicleService: VehicleServiceService){}

  create : boolean = true;
  title: string ="";
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

    }
  }
  save() {
    const vehicle = this.vehicleForm.value as IVehicle;

    if (this.create) {
      this.vehicleService.create(vehicle).subscribe({
        next: () => {
          console.log("Siker!")
        },
        error: (err) => {
          console.error(err);
          console.log("Nem jó")
        }
      })
    }
    else {
      this.vehicleService.update(vehicle).subscribe({
        next: () => {
          console.log("Siker!")
        },
        error: (err) => {
          console.error(err);
          console.log("Nem jó")
        }
      })
    }
    
  }

}
