import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import * as firebase from 'firebase';
import {Router} from '@angular/router';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.checkUser();
  }
  checkUser() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log('logged in', user);
      } else {
        this.router.navigateByUrl('/intercept');
        console.log('not logged in');
      }
    });
  }
}
