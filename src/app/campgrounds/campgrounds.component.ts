import { Component, OnInit } from '@angular/core';
import {CampsService} from '../../services/camps.service';
import {Camp} from '../camp';

@Component({
  selector: 'app-campgrounds',
  templateUrl: './campgrounds.component.html',
  styleUrls: ['./campgrounds.component.css']
})
export class CampgroundsComponent implements OnInit {
  camps: any;
  constructor(private campService: CampsService) { }

  ngOnInit() {
    this.getCampsList();
  }

  getCampsList() {
    // Use snapshotChanges().map() to store the key
    this.campService.getCampsList().snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    }).subscribe(camps => {
      this.camps = camps;
    });
  }
}
