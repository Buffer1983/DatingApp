import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

//In order to be create this component run from cmd in folder src/app this command = "ng g c home --skip-tests"

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  registerMode = false;
 
  // only for demo to show parent to child
  // users:any;
  // constructor(private http: HttpClient ) { } 
  constructor() { }

  ngOnInit(): void {
    // this.getUsers(); only for demo to show parent to child
  }

  registerToggle(){
    this.registerMode =!this.registerMode;
  }
  
  // only for demo to show parent to child
  // getUsers(){
  //   // users=>this.users=users responsible to get users from API is an array of users and
  //   // set the users of our class (users:any) equal to users retrieved from api
  //   this.http.get('https://localhost:5001/api/users').subscribe(users => this.users=users);

  // }

  //method with parameter boolean because that type we transmit
  cancelRegisterMode(event:boolean){
    this.registerMode =event;
  }
}
