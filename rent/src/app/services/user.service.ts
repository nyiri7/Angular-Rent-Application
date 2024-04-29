import { Injectable } from '@angular/core';
import { backend } from '../api';
import { AccessTokenDTO, LoginDTO, UserDTO } from '../../dataTypes/models';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  path: string = backend+'/user/'
  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<UserDTO[]>(this.path);    
  }

  getOne(id: number) {
    return this.http.get<UserDTO>(this.path + id);    
  }

  create(user: UserDTO) {
    return this.http.post<UserDTO>(this.path, user);
  }

  update(user: UserDTO) {
    return this.http.put<UserDTO>(this.path, user);
  }

  delete(id: number) {
    return this.http.delete(this.path + id); 
  }

  login(data: LoginDTO) {
    return this.http.post<AccessTokenDTO>(this.path+'login', data);
}
}
