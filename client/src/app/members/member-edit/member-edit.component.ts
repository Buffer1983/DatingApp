import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs/operators';
import { Member } from 'src/app/_models/member';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { MembersService } from 'src/app/_services/members.service';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})
export class MemberEditComponent implements OnInit {
  //With @Viewchild we get access to form with id = editForm (html) and can react with it. We declare that is a class of ngform
  @ViewChild('editForm') editForm:NgForm
  member : Member;
  user : User;
  //We declare a @HostListener for window unload event. Before window unload (close - change site etc) it will check if html form editform is "dirty" (modifications)
  //if yes guard notification
  @HostListener('window:beforeunload',['$event']) unloadNotification($event:any){
    if(this.editForm.dirty){
      $event.returnValue = true;
    }
  }

  constructor(private accountService: AccountService, private memberService: MembersService, private toastr: ToastrService) { 
    this.accountService.currentUser$.pipe(take(1)).subscribe(user=> this.user=user);
  }

  ngOnInit(): void {
    this.loadMember();
  }

  loadMember(){
    this.memberService.getMember(this.user.username).subscribe(member =>{this.member=member});
  }

  updateMember(){
    //Call member service to send to API and save. We dont expext sth to return so we leave it empty"()"."
    this.memberService.updateMember(this.member).subscribe(()=>{
      this.toastr.success("Profile Updated Successfully");
      //reset html form and load this (edited member)
      this.editForm.reset(this.member);
    })
  }
}
