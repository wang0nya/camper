import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerSuccess: any;
  registerError: any;
  constructor(private authService: AuthService, private afAuth: AngularFireAuth) { }

  ngOnInit() {
  }
  onSubmit(formData) {
      console.log(formData.value);
      this.emailSignup(
        formData.value.email,
        formData.value.password
      );
  }
  emailSignup(email: string, password: string) {
    this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then(value => {
        firebase
          .database()
          .ref('/userProfiles')
          .push({ email: email });
        this.sendEmailVerification();
        console.log('Success', value);
        // this.router.navigateByUrl('/campgrounds');
      })
      .catch(error => {
        console.log('Something went wrong: ', error);
        this.registerError = error.message;
      });
  }

  sendEmailVerification() {
    this.afAuth.authState.subscribe(user => {
      user.sendEmailVerification()
        .then(() => {
          console.log('email sent');
          this.registerSuccess = 'Check your email for a verification email.';
        });
    });
  }
}
