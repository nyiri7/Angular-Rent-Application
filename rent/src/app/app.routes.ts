import { Routes } from '@angular/router';
import { FlottaComponent } from './flotta/flotta.component';
import { RentingComponent } from './renting/renting.component';
import { VehicleCOUComponent } from './vehicle-cou/vehicle-cou.component';
import { CustomersComponent } from './customers/customers.component';
import { CustomerCOUComponent } from './customer-cou/customer-cou.component';
import { RentsComponent } from './rents/rents.component';
import { RentendComponent } from './rentend/rentend.component';
import { HystorysComponent } from './hystorys/hystorys.component';

export const routes: Routes = [
  {
    path: 'flotta',
    component: FlottaComponent,
  },
  {
    path: '',
    component: FlottaComponent,
  },
  {
    path: 'vehicle',
    component: VehicleCOUComponent,
  },
  {
    path: 'vehicle/:id',
    component: VehicleCOUComponent,
  },
  {
    path: 'customers',
    component: CustomersComponent,
  },
  {
    path: 'customer/:id',
    component: CustomerCOUComponent,
  },
  {
    path: 'rent',
    component: RentingComponent,
  },
  {
    path: 'rents',
    component: RentsComponent,
  },
  {
    path: 'end/:id',
    component: RentendComponent,
  },
  {
    path: 'history',
    component: HystorysComponent,
  },
];

export default routes;
