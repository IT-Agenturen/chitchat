import { Component,   } from '@angular/core';
import { User } from '../models/user.model';
import { ChatService } from '../services/chat.service';
import { AngularFireList } from 'angularfire2/database';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent {
  users: User;

  constructor(chat: ChatService) {

    chat.getUsers().forEach(element => {
      this.users = element;
      console.log(this.users);
    });;
  }



}