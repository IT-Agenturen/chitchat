import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from "@angular/forms";  
import { AppRoutingModule } from './app-routing.module';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { UserItemComponent } from './user-item/user-item.component';
import { UserListComponent } from './user-list/user-list.component';
import { MessageComponent } from './message/message.component';
import { FeedComponent } from './feed/feed.component';
import { ChatFormComponent } from './chat-form/chat-form.component';
import { ChatroomComponent } from './chatroom/chatroom.component';

import { ChatService } from './services/chat.service';
import { AuthService } from './services/auth.service';

import { environment } from '../environments/environment';
import * as firebase from 'firebase';




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
    UserItemComponent,
    UserListComponent,
    MessageComponent,
    FeedComponent,
    ChatFormComponent,
    ChatroomComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularFireAuthModule, 
    AngularFireModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,

  ],
  providers: [
  AuthService,
  ChatService
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
