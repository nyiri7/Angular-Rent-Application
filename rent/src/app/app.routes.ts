import { Routes } from '@angular/router';
import { FlottaComponent } from './flotta/flotta.component';
import { RentingComponent } from './renting/renting.component';
import { VehicleCOUComponent } from './vehicle-cou/vehicle-cou.component';
import { CustomersComponent } from './customers/customers.component';
import { CustomerCOUComponent } from './customer-cou/customer-cou.component';
import { RentsComponent } from './rents/rents.component';
import { RentendComponent } from './rentend/rentend.component';
import { HystorysComponent } from './hystorys/hystorys.component';
import { LoginComponent } from './login/login.component';
import { AuthService } from './services/auth.service';
import { inject } from '@angular/core';
import { UserFormComponent } from './user-form/user-form.component';

export const routes: Routes = [
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
    canActivate: [ () => inject(AuthService).preventGuestAccess() ]
  },
  {
    path: 'customers',
    component: CustomersComponent,
  },
  {
    path: 'customer/:id',
    component: CustomerCOUComponent,
    canActivate: [ () => inject(AuthService).preventGuestAccess() ]
  },
  {
    path: 'customer',
    component: CustomerCOUComponent,
    canActivate: [ () => inject(AuthService).preventGuestAccess() ]
  },
  {
    path: 'rent',
    component: RentingComponent,
    canActivate: [ () => inject(AuthService).preventGuestAccess() ]
  },
  {
    path: 'rents',
    component: RentsComponent,
  },
  {
    path: 'end/:id',
    component: RentendComponent,
    canActivate: [ () => inject(AuthService).preventGuestAccess() ]
  },
  {
    path: 'history',
    component: HystorysComponent,
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: UserFormComponent
  },
];

export default routes;
