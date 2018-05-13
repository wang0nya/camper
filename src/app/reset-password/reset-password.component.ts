import { Component, OnInit } from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
success: any;
error: any;
  email = '';
  constructor(private afAuth: AngularFireAuth) { }

  ngOnInit() {
  }
  onSubmit(formData) {
    this.sendPassword(
      formData.value.email
    );
  }
  sendPassword(email: string) {
    this.afAuth.auth.sendPasswordResetEmail(email)
      .then(() => {
        console.log('email sent');
        this.success = 'Check your email for a link to reset your password';
      })
      .catch(err => {
        console.log('Something went wrong: ', err.message);
        this.error = err.message;
      });
  }
}
