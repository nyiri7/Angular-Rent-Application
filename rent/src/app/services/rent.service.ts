import { Injectable } from '@angular/core';
import { backend } from '../api';
import { HttpClient } from '@angular/common/http';
import { IRent } from '../../dataTypes/models';

@Injectable({
  providedIn: 'root'
})
export class RentService {

  path: string = backend+'/rents/'

  constructor(private http: HttpClient) { }
  
  getAll() {
    return this.http.get<IRent[]>(this.path);
  }
  getOne(id: number) {
    return this.http.get<IRent>(this.path + id);
  }

  getByCustomer(id:number) {
    return this.http.get<IRent[]>(this.path+"/customer/"+id);
  }
  getByVehicle(id:number){
    return this.http.get<IRent>(this.path+"/vehicle/" + id);
  }
  delete(id: number) {
    return this.http.delete(this.path + id);
  }
  create(vehicle: IRent) {
    return this.http.post<IRent>(this.path, vehicle);
  }

  update(vehicle: IRent) {
    return this.http.put<IRent>(this.path, vehicle);
  }
}
