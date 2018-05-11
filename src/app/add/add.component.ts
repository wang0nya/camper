import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import * as firebase from 'firebase';
import {Router} from '@angular/router';
import {CampsService} from '../../services/camps.service';
import {Camp} from '../camp';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  camp: Camp = new Camp();
  submitted = false;
  constructor(private authService: AuthService, private router: Router,
              private campService: CampsService) { }

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
  newCamp(): void {
    this.submitted = false;
    this.camp = new Camp();
  }

  save() {
    this.campService.createCamp(this.camp);
    this.camp = new Camp();
  }

  onSubmit() {
    this.submitted = true;
    this.save();
  }
}
