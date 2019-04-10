import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  public user:any;
  public appPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'List',
      url: '/list',
      icon: 'list'
    },
    {
      title: 'Sign Up',
      url: '/signup',
      icon: 'person'
    },
    {
      title: 'Sign In',
      url:'/signin',
      icon: 'log-in'
    },
    {
      title:'Sign Out',
      url:'/signout',
      icon: 'exit'
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private afAuth:AngularFireAuth,
    private router:Router
  ) {
    this.initializeApp();
    this.checkAuthStatus();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  checkAuthStatus(){
    this.afAuth.authState.subscribe( (user) => {
      if( user ){
        this.user = user;
        this.router.navigate(['/home']);
        //update navigation for logged in user
        this.appPages = [
          {
            title: 'Home',
            url: '/home',
            icon: 'home'
          },
          {
            title: 'List',
            url: '/list',
            icon: 'list'
          },
          {
            title:'Sign Out',
            url:'/signout',
            icon: 'exit'
          }
        ];
      }
      else{
        //update navigation for not authed user
        this.user = null;
        this.router.navigate(['/signup']);
        this.appPages = [
          {
            title: 'Sign In',
            url:'/signin',
            icon: 'log-in'
          },
          {
            title: 'Sign Up',
            url: '/signup',
            icon: 'person'
          }
        ];
      }
    });
  }
}
