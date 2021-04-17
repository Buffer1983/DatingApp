import { Component, OnInit, ViewChild } from '@angular/core';
import { Member } from 'src/app/_models/member';
import { MembersService } from 'src/app/_services/members.service';
import { ActivatedRoute } from '@angular/router';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from '@kolkov/ngx-gallery';
import { TabDirective, TabsetComponent } from 'ngx-bootstrap/tabs';
import { Message } from 'src/app/_models/message';
import { MessageService } from 'src/app/_services/message.service';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css']
})
export class MemberDetailComponent implements OnInit {
  //Get Access to tabs control of html. It is bootstrap component, so we declare the appropriate type (ngx-bootstrap/tabs)
  @ViewChild('memberTabs',{static: true}) memberTabs : TabsetComponent;
  member: Member;
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];
  //Which tab is selected
  activeTab: TabDirective;
  messages: Message[] = [];

  constructor(private memberService: MembersService, private route: ActivatedRoute, private messageService : MessageService) { }

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
        this.loadMessages();
    }
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
