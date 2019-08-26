import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, FacebookLoginProvider, SocialUser } from 'angularx-social-login';
import { FormControl } from '@angular/forms';
declare var FB: any;


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    title="ChitChat-Logga in"
    public user: any = SocialUser;
    wrong_login = false;



  constructor(
    private router: Router,
    private socialAuthService: AuthService) { }




    public socialSignIn(socialPlatform : string) {
      if(socialPlatform == "facebook"){
        this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID)
        .then((userData) => {
          this.user = userData;
          if(userData['response_code'] == 404){
            this.wrong_login = true;
          } else{
            localStorage.setItem('currentUser', JSON.stringify(this.user));
            this.router.navigate(['chitchat']);
            console.log(localStorage);
          }
        });
      }
    }
  


  ngOnInit() {  
    
  }
}
