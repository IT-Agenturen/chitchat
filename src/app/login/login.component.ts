import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, FacebookLoginProvider, SocialUser } from 'angularx-social-login';
import { userInfo } from 'os';
import { resolve } from 'dns';
declare var FB: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    title="ChitChat-Logga in"
    public user: any = SocialUser;


  constructor(
    private router: Router,
    private socialAuthService: AuthService) { }

    facebookLogin(){
      this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID).then((userData) => {
        this.user = userData;
        console.log(this.user);
      }).then(resolve => this.router.navigate(['chitchat']))
        .catch(error => this.errormsg = error.message);
    }



  ngOnInit() {  
    
  }
}

