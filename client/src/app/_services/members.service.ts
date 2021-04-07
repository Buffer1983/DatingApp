import { HttpClient, HttpHeaders, JsonpClientBackend } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Member } from '../_models/member';

@Injectable({
  providedIn: 'root'
})
export class MembersService {
  baseUrl = environment.apiUrl;
  //Services are singleton. They start when a component needs to be serviced and stops when application stops
  //So we can store states and data inside them
  members: Member[] = [];

  constructor(private http: HttpClient) { }

  getMembers() {
    // if array us not empty return an observable of this.member (of returns observarble)
    if(this.members.length>0) return of (this.members) 
    return this.http.get<Member[]>(this.baseUrl+'users').pipe(
      map(members=>{
        this.members = members;
        return members;
      })
    );     
  }

  getMember(username : string){
    const member = this.members.find (x=>x.username===username);
    if(member!== undefined) return of(member);
    return this.http.get<Member>(this.baseUrl + 'users/'+username);
  }

  updateMember(member:Member){
    return this.http.put(this.baseUrl+'users',member).pipe(
      map(()=> {
        const index = this.members.indexOf(member);
        this.members[index] = member;
      })
    )
  }

  setMainPhoto(photoId:number){
    //we send to api the id of the photo that we want to make as main. User will be taken from json (user and token auth).
    // Body empty object (no need to send anything else)
    return this.http.put(this.baseUrl+'users/set-main-photo/' +photoId,{});
  }

  deletePhoto(photoId:number){
    return this.http.delete(this.baseUrl+"users/delete-photo/" + photoId);
  }

}
