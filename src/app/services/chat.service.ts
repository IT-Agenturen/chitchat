import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

import { ChatMessage } from '../models/chat-message.model';


@Injectable({
  providedIn: 'root'
})
export class ChatService {
  user: any;
  chatMessages: AngularFireList<ChatMessage>;
  chatMessage: ChatMessage;
  userName: Observable<string>;
  var1$;
  var2$;


  constructor(
    private db: AngularFireDatabase, 
    private afAuth: AngularFireAuth
    ) { 
    this.afAuth.authState.subscribe(auth => {
      if(auth!== undefined && auth !== null)
      {
        this.user = auth;
      }
      this.getUser().forEach((u) => {
        this.userName = u[0];
        console.log(this.userName);
    });
    });
  }

  getUser() {
    const userId = this.user.uid;
    //console.log(userId);
    const path = `users/${userId}`;
    this.db.list('users/userId')
    const itemsRef: AngularFireList<ChatMessage> = this.db.list(path);
    this.var1$ = itemsRef.snapshotChanges();
    this.var2$ = itemsRef.valueChanges();
 
    return this.var2$;
  }
 


  sendMessage(msg: string) {
    const timeStamp = this.getTimeStamp();
    const email = "test@example.com"; //this.user.email;
    this.chatMessages = this.getMessages();
    
    var message = {
      message: msg,
      timeSent: timeStamp,
      userName: "test-user",//this.userName,
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
    // query to create our message feed binding
    const itemsRef: AngularFireList<ChatMessage> = this.db.list('/messages');
    this.var1$ = itemsRef.snapshotChanges();
    this.var2$ = itemsRef.valueChanges();
    return this.var2$;
  }

}

 