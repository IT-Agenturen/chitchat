import { Component, OnInit, HostListener} from '@angular/core';
import { ChatService } from '../services/chat.service';


@Component({
  selector: 'app-chat-form',
  templateUrl: './chat-form.component.html',
  styleUrls: ['./chat-form.component.scss']
})
export class ChatFormComponent implements OnInit {

  message: string;
  page_no = 1;
  is_call = false;
  total_page = 0;
  selected_tab = 0;
  @HostListener("window:scroll")
    onWindowScroll() {
    //In chrome and some browser scroll is given to body tag
    let pos = (document.documentElement.scrollTop || document.body.scrollTop);
    let max = document.documentElement.scrollHeight;
    let height = window.innerHeight;
    
    if(pos > max - height - 500 && !this.is_call && this.page_no <= this.total_page && this.selected_tab == 1 )   {
      this.page_no++;
      this.is_call = true;
    }
  }

  constructor(
    private chat: ChatService) { 
    }

  ngOnInit() {
  }

  send() {
    this.chat.sendMessage(this.message);
    this.message = '';
  }


  handleSubmit(event){
    if(event.keyCode === 13){
      this.send();
    }
  }
}
