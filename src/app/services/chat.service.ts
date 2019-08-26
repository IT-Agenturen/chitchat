import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from 'angularfire2/database';
import { Observable } from 'rxjs';

import { ChatMessage } from '../models/chat-message.model';


@Injectable({
  providedIn: 'root'
})
export class ChatService {
  user: any;
  chatMessages: AngularFireList<ChatMessage>;
  chatMessage: ChatMessage;
  userName: Observable<string>;
  userId: Observable<string>;
  email: Observable<string>;
  liked: Observable<boolean>;
  var1$;
  var2$;


  constructor(
    private db: AngularFireDatabase, 
    ) { 
    var user = JSON.parse(localStorage.getItem('currentUser'));
    if(user!== undefined && user !== null){
     this.userName =  user['name'];
     this.userId = user['id'];
     this.email = user['email'];
  };
}

  getUser() {
    const userId = this.userId;
    const path = `users/${userId}`;
    this.db.list('users/userId')
    const itemsRef: AngularFireList<ChatMessage> = this.db.list(path);
    this.var1$ = itemsRef.snapshotChanges();
    this.var2$ = itemsRef.valueChanges();
 
    return this.var2$;
  }
 


  sendMessage(msg: string) {
    const timeStamp = this.getTimeStamp();
    const email = this.email;
    this.chatMessages = this.getMessages();
    
    var message = {
      message: msg,
      timeSent: timeStamp,
      userName: this.userName,
      email: email
    };
    console.log('Called sendmessage');
    const item = this.db.list('/messages');
    item.push(message);
  }
  


  getTimeStamp(){
    const now = new Date();
    const date = now.getUTCFullYear() + '/' +
                 (now.getUTCMonth() +1 ) + '/' +
                  now.getUTCDate();
    const time = now.getUTCHours() + ':' +
                 now.getUTCMinutes()  + ':' +
                 now.getUTCSeconds();

    return (date + ' ' + time);  
  }

 
  getMessages(): AngularFireList<ChatMessage> {
    // create our message feed binding
    const itemsRef: AngularFireList<ChatMessage> = this.db.list('/messages');
    this.var1$ = itemsRef.snapshotChanges();
    this.var2$ = itemsRef.valueChanges();
    return this.var2$;
  }

}

 