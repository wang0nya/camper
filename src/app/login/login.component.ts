import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
email = '';
password = '';
  constructor(private authService: AuthService) { }

  ngOnInit() {
  }
  google() {
    this.authService.googleLogin();
  }
  onSubmit(formData) {
    console.log(formData.value);
    this.authService.login(
      formData.value.email,
      formData.value.password
    );
  }
}
