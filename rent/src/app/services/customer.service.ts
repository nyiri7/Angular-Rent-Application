import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { backend } from '../api';
import { ICustomer } from '../../dataTypes/models';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  path: string = backend+'/customers/'

  constructor(private http: HttpClient) { }
  
  getAll() {
    return this.http.get<ICustomer[]>(this.path);
  }
  getOne(id: number) {
    return this.http.get<ICustomer>(this.path + id);
  }
  delete(id: number) {
    return this.http.delete(this.path + id);
  }
  create(customer: ICustomer) {
    return this.http.post<ICustomer>(this.path, customer);
  }

  update(customer: ICustomer) {
    return this.http.put<ICustomer>(this.path, customer);
  }
}
