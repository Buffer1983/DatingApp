import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { MembersOnSite } from 'src/app/_models/membersOnSite';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { MembersOnSiteService } from 'src/app/_services/members-on-site.service';

@Component({
  selector: 'app-members-on-site',
  templateUrl: './members-on-site.component.html',
  styleUrls: ['./members-on-site.component.css']
})
export class MembersOnSiteComponent implements OnInit {
  membersOnSite : MembersOnSite[] =[];
  user:User;

  constructor(private router:Router,private accountService : AccountService,
     public membersOnSiteService:MembersOnSiteService) { 
      this.accountService.currentUser$.pipe(take(1)).subscribe(user => this.user = user);
      //in order to reload page if same tab is requested
      this.router.routeReuseStrategy.shouldReuseRoute = () =>false;

     }

  ngOnInit(): void {
    this.membersOnSiteService.createHubConnection(this.user);
    console.log(this.membersOnSiteService.onSiteThread$);
  }


  ngOnDestroy(): void {
    this.membersOnSiteService.stopHubConnection();
  }
}
