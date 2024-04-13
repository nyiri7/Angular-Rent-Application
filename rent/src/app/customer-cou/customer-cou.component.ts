import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CustomerService } from '../services/customer.service';
import { ICustomer } from '../../dataTypes/models';

@Component({
  selector: 'app-customer-cou',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './customer-cou.component.html',
  styleUrl: './customer-cou.component.css'
})
export class CustomerCOUComponent implements OnInit {

  customerForm = this.formBuilder.group({

    id: this.formBuilder.control(0),
    firstName: this.formBuilder.control(""),
    lastName: this.formBuilder.control(""),
    age: this.formBuilder.control(0),
    birthday : this.formBuilder.control(new Date()),
    birthAdress: this.formBuilder.control(""),
    nationality: this.formBuilder.control(""),
    mothersName: this.formBuilder.control(""),
    email: this.formBuilder.control(""),
    idCardNumber: this.formBuilder.control("")
  });
  
  constructor(private activatedRoute: ActivatedRoute,private formBuilder: FormBuilder,private customerService: CustomerService){}

  create : boolean = true;
  title: string ="";


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
          console.error(err);
        }
      });

    }
  }
  save() {
    const customer = this.customerForm.value as ICustomer;

    if (this.create) {
      this.customerService.create(customer).subscribe({
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
      this.customerService.update(customer).subscribe({
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
