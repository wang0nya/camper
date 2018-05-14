import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import * as firebase from 'firebase';
import {Router} from '@angular/router';
import {Camp} from '../camp';
import {FormsModule} from '@angular/forms';
import {AngularFireDatabase, AngularFireList} from 'angularfire2/database';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  private dbPath = '/camps';
  postedBy: any;
  campsRef: AngularFireList<any> = null;
  camp: Camp = new Camp();
  submitted = false;
  constructor(private authService: AuthService, private router: Router, private db: AngularFireDatabase) {
    this.campsRef = db.list(this.dbPath);
  }

  ngOnInit() {
    this.checkUser();
  }
  checkUser() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.postedBy = user.displayName;
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
    // this.createCamp(this.camp);
    this.camp = new Camp();
  }
  createCamp(name: string, imageurl: string, description: string, postedBy: string): void {
    this.campsRef.push({
      name: name,
      imageurl: imageurl,
      description: description,
      postedBy: this.postedBy
    })
      .then(newCamp => {
      console.log('new camp created with key:', newCamp.key);
    });
  }
  onSubmit(formData) {
    this.submitted = true;
    this.save();
    this.createCamp(
      formData.value.name,
      formData.value.imageurl,
      formData.value.description,
      formData.value.postedBy
    );
  }
}
