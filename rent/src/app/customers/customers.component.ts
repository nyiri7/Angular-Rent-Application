import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ICustomer } from '../../dataTypes/models';
import { CustomerService } from '../services/customer.service';
import { FormsModule } from '@angular/forms';
import { SlicePipe } from '@angular/common';
import { NgbPagination } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-customers',
  standalone: true,
  imports: [RouterModule,FormsModule,SlicePipe,NgbPagination],
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.css'
})
export class CustomersComponent {
  

  page: number =1;
  pagesize:number = 10
  
  customers: ICustomer[] = [];
  filteredcustomers: ICustomer[] = [];


  //Filter
  nation: string = "";
  search: string = "";
  adress:string = "";
  nationalitys: string[] = [];
  BirthAdresses: string[] = [];

  constructor(
    private router: Router,
    private CustomerService: CustomerService){}

  ngOnInit(): void {
    this.CustomerService.getAll().subscribe({
      next: (customer) => {
        this.customers = customer;
        this.filteredcustomers = this.customers;
        this.nationalitys = Array.from(new Set(this.customers.map(customer => customer.nationality)));
        this.BirthAdresses = Array.from(new Set(this.customers.map(customer => customer.birthAdress)));
        
      },
      error: (err) => console.error(err)
    });
  };

  filter(){
    if(!(this.customers.length == 0)){
      this.filteredcustomers = this.customers.filter((customer)=>{
        return ((customer.idCardNumber.toLowerCase().includes(this.search.toLowerCase()) || customer.email.toLowerCase().includes(this.search.toLowerCase()) ||
        customer.mothersName.toLowerCase().includes(this.search.toLowerCase())||
        (customer.firstName+" "+customer.lastName).toLowerCase().includes(this.search.toLowerCase())||
        (customer.lastName+" "+customer.firstName).toLowerCase().includes(this.search.toLowerCase())) || this.search ==="") &&
        ((customer.birthAdress===this.adress)||this.adress==="") && ((customer.nationality===this.nation)||this.nation==="")
      } );

    }
  }

  deleteCustomer(customer: ICustomer){
    this.CustomerService.delete(customer.id).subscribe({
      next: () => {
        const index = this.customers.indexOf(customer);
        if (index > -1) {
          this.customers.splice(index, 1);
        }
      },
      error: (err) => {
        console.error(err);
      }
    });
  }
}
