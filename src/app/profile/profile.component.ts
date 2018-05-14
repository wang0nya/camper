import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import * as firebase from 'firebase';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
userEmail: any;
username: any;
photourl: any;
  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.checkUser();
  }
  logout() {
    this.authService.logout();
  }
  checkUser() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.username = user.displayName;
        this.userEmail = user.email;
        this.photourl = user.photoURL;
      }
    });
  }
}
