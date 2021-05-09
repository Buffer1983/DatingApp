import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MembersOnSite } from '../_models/membersOnSite';
import { User } from '../_models/user';
import { MemberEditComponent } from '../members/member-edit/member-edit.component';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MembersOnSiteService {
  hubUrl = environment.hubUrl;
  private hubConnection: HubConnection;
  private onSiteThreadSource = new BehaviorSubject<MembersOnSite[]>([]);
  onSiteThread$ = this.onSiteThreadSource.asObservable();

  constructor(private http: HttpClient) { }

  createHubConnection(user: User) {
    this.hubConnection = new HubConnectionBuilder()
      .withUrl(this.hubUrl + 'membersonsite' , {
        accessTokenFactory: () => user.token
      })
      .withAutomaticReconnect()
      .build();
   

    this.hubConnection.start().catch(error => console.log(error));
    
    //The hub name must be exact same as in API (MessageHub->OnConnectedAsync method)
    this.hubConnection.on('MembersOnSiteThread', member => {
      this.onSiteThread$.pipe(take(1)).subscribe(members=>{
        this.onSiteThreadSource.next([...members,member]);
      })
      
    })
  }

  stopHubConnection() {
    //To be sure that no double stopconnections wikk take place (eg leaving messages and site)
    if (this.hubConnection) {
      this.hubConnection.stop();
    }
  }

}
