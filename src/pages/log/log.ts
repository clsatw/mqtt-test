import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
/*
import { AngularFireList } from 'angularfire2/database';
// import {FirebaseProvider} from '/providers/firebase/firebase.ts';

import { FirebaseProvider } from '../../providers/firebase/firebase';
import { Log } from '../../app/shared/log.model';
*/

/**
 * Generated class for the LogPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()  // declarator for lazyloading
@Component({
  selector: 'page-log',
  templateUrl: 'log.html',
})
export class LogPage {
  // arrData: Log[];
  text: string;
  constructor() {
    console.log('Hello LogListPage');
    this.text = 'Log Page';
  } 
}
