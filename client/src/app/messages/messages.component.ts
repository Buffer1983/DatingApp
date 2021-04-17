import { Component, OnInit } from '@angular/core';
import { Message } from '../_models/message';
import { Pagination } from '../_models/pagination';
import { MessageService } from '../_services/message.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
  messages: Message[] = [];
  pagination: Pagination;
  container= 'Unread';
  pageNumber: number = 1;
  pageSize: number = 5;
  loading = false;

  constructor(private messageService: MessageService) { }

  ngOnInit(): void {
    this.loadMessages();
  }

  loadMessages() {
      //Images are loading slower than data.Show wait until all data and images retrieved. Will be used in html as flag
      this.loading = true;
      this.messageService.getMessages(this.pageNumber, this.pageSize, this.container).subscribe(response => {
      this.messages = response.result;
      this.pagination = response.pagination;
      this.loading = false;
    })
  }

  deleteMessage(id:number){
    this.messageService.deleteMessage(id).subscribe(()=>{
      //remove from messages array the deleted item
      //splice removes selected item from an array and returns array
      this.messages.splice(this.messages.findIndex(m=>m.id === id),1)
    })
  }

  pageChanged(event: any) {
    this.pageNumber = event.page;
    this.loadMessages();
  }
}
