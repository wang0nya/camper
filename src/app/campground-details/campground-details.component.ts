import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {AngularFireDatabase, AngularFireList} from 'angularfire2/database';
import {Camp} from '../camp';

@Component({
  selector: 'app-campground-details',
  templateUrl: './campground-details.component.html',
  styleUrls: ['./campground-details.component.css']
})
export class CampgroundDetailsComponent implements OnInit {
  private dbPath = '/camps';
  campDetails: AngularFireList<Camp> = null;
  details: any;
  public key: string;

  constructor(private router: Router, private db: AngularFireDatabase) {
      this.key = this.router.url.slice(13);
    this.campDetails = db.list(this.dbPath, ref => ref.orderByChild('key').equalTo(this.key));
    this.campDetails.snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    }).subscribe(details => {
      this.details = details;
    });
  }

  ngOnInit() {
    // this.getCampDetails(this.key);
  }
}
