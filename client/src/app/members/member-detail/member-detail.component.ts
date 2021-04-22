import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Member } from 'src/app/_models/member';
import { MembersService } from 'src/app/_services/members.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from '@kolkov/ngx-gallery';
import { TabDirective, TabsetComponent } from 'ngx-bootstrap/tabs';
import { Message } from 'src/app/_models/message';
import { MessageService } from 'src/app/_services/message.service';
import { PresenceService } from 'src/app/_services/presence.service';
import { AccountService } from 'src/app/_services/account.service';
import { User } from 'src/app/_models/user';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css']
})

//When leaving the page or the component, we want to destroy hub connection
export class MemberDetailComponent implements OnInit,OnDestroy {
  //Get Access to tabs control of html. It is bootstrap component, so we declare the appropriate type (ngx-bootstrap/tabs)
  @ViewChild('memberTabs',{static: true}) memberTabs : TabsetComponent;
  member: Member;
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];
  //Which tab is selected
  activeTab: TabDirective;
  messages: Message[] = [];
  user:User;

  constructor(public presence: PresenceService , private route: ActivatedRoute,
     private messageService : MessageService, private accountService : AccountService,
     private router:Router) { 
       this.accountService.currentUser$.pipe(take(1)).subscribe(user => this.user = user);
       //in order to reload page if same tab is requested
       this.router.routeReuseStrategy.shouldReuseRoute = () =>false;
     }

  ngOnInit(): void {
    //Thanks to our resolver, we can pass from route the member. This way it will be loaded before
    //rendering UI
    this.route.data.subscribe(data=>{
      this.member = data.member;
    })

    this.route.queryParams.subscribe(params=>{
      params.tab?  this.selectTab(params.tab) : this.selectTab(0);
    })

    this.galleryOptions = [
      {
        width: '500px',
        height: '500px',
        imagePercent: 100,
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide,
        preview: false
      }
    ]
    //because we have member from route we can access Images from load
    this.galleryImages = this.getImages();
  }

  getImages(): NgxGalleryImage[] {
    const imageUrls = [];
    for (const photo of this.member.photos) {
      imageUrls.push({
        small: photo?.url,
        medium: photo?.url,
        big: photo?.url
      })
    }
    return imageUrls;
  }

  //In order to loadMessages only when tab is enabled or the messages length ===0
  onTabActivated(data: TabDirective){
    this.activeTab = data;
    if(this.activeTab.heading === 'Messages' && this.messages.length===0){
        // this.loadMessages(); We stop getting Messages from db and connecting to hub
        this.messageService.createHubConnection(this.user,this.member.username);
    }else{
        this.messageService.stopHubConnection();
    }
  }

  ngOnDestroy(): void {
    this.messageService.stopHubConnection();
  }

  loadMessages(){
    this.messageService.getMessageThread(this.member.username).subscribe(messages =>{
      this.messages=messages;
    })
  }

  //Selecting the messages tab when clicking the message button from member-detail or member-card
  selectTab(tabId: number){
    this.memberTabs.tabs[tabId].active = true;
  }

}
