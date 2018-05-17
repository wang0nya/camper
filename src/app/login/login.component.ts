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
    this.login(
      formData.value.email,
      formData.value.password
    );
  }
  login(email: string, password: string) {
    this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then(() =>
        this.router.navigateByUrl('/campgrounds'))
      .catch(err => {
        console.log('Something went wrong: ', err.message);
        this.error = err.message;
      });
  }
}
