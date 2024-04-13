import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IVehicle } from '../../dataTypes/models';
import { backend } from '../api';

@Injectable({
  providedIn: 'root'
})
export class VehicleServiceService {

  path: string = backend+'/vehicles/'

  constructor(private http: HttpClient) { }
  
  getAll() {
    return this.http.get<IVehicle[]>(this.path);
  }
  getOne(id: number) {
    return this.http.get<IVehicle>(this.path + id);
  }
  delete(id: number) {
    return this.http.delete(this.path + id);
  }
  create(vehicle: IVehicle) {
    return this.http.post<IVehicle>(this.path, vehicle);
  }

  update(vehicle: IVehicle) {
    return this.http.put<IVehicle>(this.path, vehicle);
  }
}
