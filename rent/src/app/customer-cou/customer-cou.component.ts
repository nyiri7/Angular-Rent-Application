import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CustomerService } from '../services/customer.service';
import { ICustomer } from '../../dataTypes/models';
import { ToastService } from '../services/toast.service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-customer-cou',
  standalone: true,
  imports: [ReactiveFormsModule,RouterModule,NgClass],
  templateUrl: './customer-cou.component.html',
  styleUrl: './customer-cou.component.css'
})
export class CustomerCOUComponent implements OnInit {
  create : boolean = true;
  title: string ="";
  today: Date = new Date()
  customerForm = this.formBuilder.group({

    id: this.formBuilder.control(0),
    firstName: this.formBuilder.control("",Validators.required),
    lastName: this.formBuilder.control("",Validators.required),
    age: this.formBuilder.control(0,[Validators.required, Validators.min(1)]),
    birthday : this.formBuilder.control(new Date(),[Validators.required,Validators.pattern(/^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/)]),
    birthAdress: this.formBuilder.control("",Validators.required),
    nationality: this.formBuilder.control("",Validators.required),
    mothersName: this.formBuilder.control("",Validators.required),
    email: this.formBuilder.control("",Validators.required),
    idCardNumber: this.formBuilder.control("",Validators.required)
  });
  
  constructor(private activatedRoute: ActivatedRoute,private formBuilder: FormBuilder,private customerService: CustomerService,private toastService: ToastService){}




  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params['id'];
    if(id){
      this.create=false;
      this.customerService.getOne(id).subscribe({
        next: (customer) => {
          this.customerForm.setValue(customer);
          this.title = customer.lastName +" "+customer.firstName
        },
        error: (err) => {
          this.create=true;
          this.toastService.show("Error",err)
        }
      });

    }
  }
  save() {

    if(this.customerForm.valid){
      const customer = this.customerForm.value as ICustomer;

      if (this.create) {
        this.customerService.create(customer).subscribe({
          next: () => {
            this.toastService.show("Mentés","Sikeres mentés!")
          },
          error: (err) => {
            this.toastService.show("Error",err)
          }
        })
      }
      else {
        this.customerService.update(customer).subscribe({
          next: () => {
            this.toastService.show("Mentés","Sikeres mentés!")
          },
          error: (err) => {
            this.toastService.show("Error",err)
          }
        })
      }
    }else{
      for (const key of Object.keys(this.customerForm.controls)) {
        this.customerForm.get(key)?.markAsTouched();
      }
      this.toastService.show("Hiba","Töltsd ki az összes kötelező mezőt!")
    }

    
  }

}
