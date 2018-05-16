import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {AngularFireDatabase, AngularFireList} from 'angularfire2/database';
import {Camp} from '../camp';
import * as firebase from 'firebase';

@Component({
  selector: 'app-campground-details',
  templateUrl: './campground-details.component.html',
  styleUrls: ['./campground-details.component.css']
})
export class CampgroundDetailsComponent implements OnInit {
  private dbPath = '/camps';
  campDetails: AngularFireList<Camp> = null;
  commentsRef: AngularFireList<any> = null;
  ratingsRef: AngularFireList<any> = null;
  savesRef: AngularFireList<any> = null;
  comments: any;
  details: any;
  comment: any;
  public key: string;
  postedBy: any;
  savedBy: any;
  user: any;
  loginMessage: any;
  formRating: any;
  constructor(private router: Router, private db: AngularFireDatabase) {
      this.key = this.router.url.slice(13);
    this.savesRef = db.list('camps/' + this.key + '/saves');
    this.commentsRef = db.list('camps/' + this.key + '/comments');
    this.commentsRef.snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    }).subscribe(comments => {
      this.comments = comments;
    });
    this.campDetails = db.list(this.dbPath, ref => ref.orderByChild('key').equalTo(this.key));
    this.campDetails.snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    }).subscribe(details => {
      this.details = details;
    });
  }

  ngOnInit() {
    this.checkUser();
  }
  checkUser() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.user = user;
        this.postedBy = user.displayName;
        this.savedBy = user.email;
      } else {
        this.loginMessage = 'You need to be logged in to react';
      }
    });
  }
  setRating(formRating: number) {
    this.ratingsRef = this.db.list('camps/' + this.key + '/ratings/' + this.postedBy);
    this.ratingsRef.push({
      ratedBy: this.postedBy,
      rating: this.formRating
    });
  }
  submitComment(comment: string, postedBy: string) {
    this.commentsRef.push({
      comment: comment,
      postedBy: postedBy
    });
    console.log('comment submitted');
  }
  save() {
    this.savesRef.push({
      savedBy: this.savedBy
    });
    console.log(this.key + 'saved by' + this.savedBy);
  }
  onSubmit(formData) {
    this.submitComment(
      formData.value.comment,
      formData.value.postedBy
    );
  }
}
