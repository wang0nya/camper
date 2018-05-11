import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { QueryFn } from 'angularfire2/database/interfaces';
import {Camp} from '../app/camp';

@Injectable()
export class CampsService {
  private dbPath = '/camps';

  campsRef: AngularFireList<Camp> = null;

  constructor(private db: AngularFireDatabase) {
    this.campsRef = db.list(this.dbPath);
  }

  createCamp(camp: Camp): void {
    this.campsRef.push(camp);
  }

  updateCamp(key: string, value: any): void {
    this.campsRef.update(key, value).catch(error => this.handleError(error));
  }

  deleteCamp(key: string): void {
    this.campsRef.remove(key).catch(error => this.handleError(error));
  }

  getCampsList(): AngularFireList<Camp> {
    return this.campsRef;
  }

  private handleError(error) {
    console.log(error);
  }
}

