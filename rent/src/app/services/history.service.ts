import { Injectable } from '@angular/core';
import { backend } from '../api';
import { HttpClient } from '@angular/common/http';
import { IHistory } from '../../dataTypes/models';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {

  path: string = backend+'/historys/'

  constructor(private http: HttpClient) { }
  
  getAll() {
    return this.http.get<IHistory[]>(this.path);
  }
  getByVehicle(id:number){
    return this.http.get<IHistory[]>(this.path+"vehicleid/" + id);
  }
  create(vehicle:number,customer:number,crash:boolean,pricee:number,rent:number,km:number) {
    console.log({vehicleid: vehicle, customerid: customer})
    return this.http.post<IHistory>(this.path+"endrent", {vehicleid: vehicle, customerid: customer,crashed: crash,price:pricee,rentid:rent,km: km});
  }
}
