import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  baseUrl = environment.apiUrl;

  constructor(private http:HttpClient) { }

  getUsersWithRoles(){
    return this.http.get<Partial<User[]>>(this.baseUrl+'admin/users-with-roles');
  }

  updateUserRoles(username : string,roles: string[]){
    //because its a type of post we have to send an object to the body. We send empty object, cause we dont need to send sth
    //all info is in header
    return this.http.post(this.baseUrl + 'admin/edit-roles/' + username +'?roles=' + roles,{});
  }

}
