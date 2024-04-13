import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ICustomer } from '../../dataTypes/models';
import { CustomerService } from '../services/customer.service';

@Component({
  selector: 'app-customers',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.css'
})
export class CustomersComponent {
  



  customers: ICustomer[] = [];
  viewVar: number = 1;

  constructor(
    private router: Router,
    private CustomerService: CustomerService){}

  ngOnInit(): void {
    this.CustomerService.getAll().subscribe({
      next: (customer) => {
        this.customers = customer;
        console.log(this.customers);
      },
      error: (err) => console.error(err)
    });
  };

  switchView() {
    if(this.viewVar==0){
      this.viewVar=1;
    }else{
      this.viewVar=0;
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
