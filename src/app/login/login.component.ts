import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';

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
      .then(value => {
        if (value.emailVerified) {
          this.router.navigateByUrl('/campgrounds');
        } else {
          // Tell the user to have a look at its mailbox
          console.log('look at your mail');
          this.confirm = 'Looks like you have not confirmed your email yet. Have a look at your email for a verification email we sent.';
        }
      })
      .catch(err => {
        console.log('Something went wrong: ', err.message);
        this.error = err.message;
      });
  }
}
