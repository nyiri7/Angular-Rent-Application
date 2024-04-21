import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { RentService } from '../services/rent.service';
import { ICustomer, IRent } from '../../dataTypes/models';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { __core_private_testing_placeholder__ } from '@angular/core/testing';
import { HistoryService } from '../services/history.service';

@Component({
  selector: 'app-rentend',
  standalone: true,
  imports: [ReactiveFormsModule,FormsModule,NgbModule,RouterModule],
  templateUrl: './rentend.component.html',
  styleUrl: './rentend.component.css'
})
export class RentendComponent implements OnInit{
  startForm = this.formBuilder.group({
    km: this.formBuilder.control(0),
    crash: this.formBuilder.control(false)
  })

  constructor(private activatedRoute: ActivatedRoute,private Rentservice: RentService,private formBuilder: FormBuilder,private Historyservice:HistoryService){}
  rent: IRent = null!;
  price: number = 0;
  progress: number =0;
  crash:boolean=false;

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params['id'];
    if(id){
      this.Rentservice.getOne(id).subscribe({
        next: (rentI) => {
          this.rent = rentI;
        },
        error: (err) => {
          console.error(err);
        }
      });

    }
  };

  plusprogress(){
    this.progress +=25;

  }
  minusprogress(minus:number){
    this.progress -=minus;

  }

  megad(){
    if(this.startForm.value.km){
      this.progress +=50;
      console.log(new Date(this.rent.rentStart).getTime())
      this.price = (Math.ceil((new Date().getTime() - new Date(this.rent.rentStart).getTime()) /(1000 * 60 * 60 * 24))*5000)+((this.startForm.value.km - this.rent.vehicle.km)*this.rent.vehicle.kmprice)
      if(this.startForm.value.crash){
        this.price += 50000;
        this.crash = this.startForm.value.crash;
      }
    }

  }

  save() {
      this.Historyservice.create(this.rent.vehicle.id,this.rent.customer.id,this.crash,this.price,this.rent.id).subscribe({
        next: () => {
          console.log("Siker!")
          this.progress=100;
        },
        error: (err) => {
          console.error(err);
          console.log("Nem jó")
        }
      })
    }
}
