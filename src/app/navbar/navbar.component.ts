import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import * as firebase from 'firebase';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  public user: any;
  constructor(private authService: AuthService) { }
  ngOnInit() {
    this.checkUser();
    this.loadScript();
  }
  checkUser() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.user = user;
        console.log('logged in', user);
      } else {
        console.log('not logged in');
      }
    });
  }
  public loadScript() {
    const body = <HTMLDivElement> document.body;
    const script = document.createElement('script');
    script.innerHTML = '';
    script.src = '../../assets/js/paper-kit.js';
    script.async = true;
    script.defer = true;
    body.appendChild(script);
  }
}
