import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';
import { Member } from 'src/app/_models/member';
import { Pagination } from 'src/app/_models/pagination';
import { User } from 'src/app/_models/user';
import { UserParams } from 'src/app/_models/userParams';
import { AccountService } from 'src/app/_services/account.service';
import { MembersService } from 'src/app/_services/members.service';

@Component({
  selector: 'app-members-print',
  templateUrl: './members-print.component.html',
  styleUrls: ['./members-print.component.css']
})
export class MembersPrintComponent implements OnInit {
  members:Member[];
  selectedMembers:Member[];
  pageNumber = 1;
  pageSize = 50;
  pagination: Pagination;
  user:User;
  userParams : UserParams;

  cols: any[];
  exportColumns: any[];


  
  constructor(private memberService: MembersService, private accountService: AccountService) {
    this.accountService.currentUser$.pipe(take(1)).subscribe(user=>{
      this.user = user;
      this.userParams = new UserParams(user);
    });
   }


  ngOnInit(): void {
    this.loadMembers();
  }

  loadMembers(){
    this.memberService.getMembers(this.userParams).subscribe((response) =>{
      this.members = response.result;
      this.selectedMembers = this.members;
      this.pagination = response.pagination;
    })
  }
}
