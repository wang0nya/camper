import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
email = '';
password = '';
error: any;
confirm: any;
  constructor(private authService: AuthService, private afAuth: AngularFireAuth,
              private router: Router) { }

  ngOnInit() {
  }

  onSubmit(formData) {
    console.log(formData.value);
    this.login(
      formData.value.email,
      formData.value.password
    );
  }
  login(email: string, password: string) {
    this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then(
        firebase.auth().onAuthStateChanged((user) => {
          if (user.emailVerified) {
            console.log(user.emailVerified);
            this.router.navigateByUrl('/campgrounds');
          } else {
            this.confirm = 'Looks like you have not verified your email yet. Take a look at your email for a verification email we sent.';
            console.log('look at your mail', user.emailVerified);
          }
        })
      )
      .catch(err => {
        console.log('Something went wrong: ', err.message);
        this.error = err.message;
      });
  }
}
