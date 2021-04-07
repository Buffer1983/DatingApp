import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Member } from 'src/app/_models/member';
import { MembersService } from 'src/app/_services/members.service';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {
  //with $ in the end we say that this is an observable
  members$: Observable<Member[]>;

  constructor(private memberService: MembersService) { }

  ngOnInit(): void {
    this.members$=this.memberService.getMembers();
  }

  // Commented out. We take the members directly from service
  // loadMembers(){
  //   this.memberService.getMembers().subscribe(members =>{
  //     this.members = members;
  //   })
  // }

}
