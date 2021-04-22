import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';
import { take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class PresenceService {
  hubUrl = environment.hubUrl;
  private hubConnection: HubConnection;
  //BehaviorSubject. We add type (here a string of array that is initialized as empty)
  //And then create an observable connected to it. Whenever a change made, BehaviorSubject emits the change
  private onlineUsersSource = new BehaviorSubject<string[]>([]);
  onlineUsers$ = this.onlineUsersSource.asObservable();

  constructor(private toastr: ToastrService, private router: Router) { }

  createHubConnection(user: User) {
    this.hubConnection = new HubConnectionBuilder()
      .withUrl(this.hubUrl + 'presence', {
        //returns a string containing access token. With the method we assign the token to user.We set automatic reconnect and we build the connection.
        accessTokenFactory: () => user.token
      })
      .withAutomaticReconnect()
      .build()
    
    //We start the HubConnection
    this.hubConnection
      .start()
      .catch(error => console.log(error));

    //We listen on to the hub for UserIsOnline and the username that are sent from API (PresenceHub).
    //Whenever hub send a user is online, add him to te list of onlineUsers
    this.hubConnection.on('UserIsOnline', username => {
      this.onlineUsers$.pipe(take(1)).subscribe(usernames => {
        this.onlineUsersSource.next([...usernames, username])
      })
    })
    
    this.hubConnection.on('UserIsOffline', username => {
      this.onlineUsers$.pipe(take(1)).subscribe(usernames => {
        //set the onlineUsers source = onlineUsers who are filtered by the user who went offline 
        //in order not to show him
        this.onlineUsersSource.next([...usernames.filter(x => x !== username)])
      })
    })


    //We call and get the users online from API. Then push it in observable
    this.hubConnection.on('GetOnlineUsers', (usernames: string[]) => {
      this.onlineUsersSource.next(usernames);
    })
    //New message notification from hub
    this.hubConnection.on('NewMessageReceived', ({username, knownAs}) => {
      this.toastr.info(knownAs + ' has sent you a new message!')
        .onTap
        .pipe(take(1))
        .subscribe(() => this.router.navigateByUrl('/members/' + username + '?tab=3'));
    })
  }

  stopHubConnection() {
    this.hubConnection.stop().catch(error => console.log(error));
  }
}