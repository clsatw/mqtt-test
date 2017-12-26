
import { Component } from '@angular/core';
import { AngularFireList } from 'angularfire2/database';
// import {FirebaseProvider} from '/providers/firebase/firebase.ts';
import { Observable } from 'rxjs/Observable';
import { FirebaseProvider } from '../../providers/firebase/firebase';
import { ReedSwLog } from '../../app/shared/reedsw.model';

/**
 * Generated class for the LogListComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'reedSw-list',
  templateUrl: 'reedsw.html'
})
export class ReedSwComponent {
  logs$: Observable<ReedSwLog[]>;
  logList: AngularFireList<ReedSwLog>; 

  constructor(private logSvc: FirebaseProvider) {
    // won't display on console.
    console.log('ionViewDidLoad Log-list component from const');
    this.logs$ = this.logSvc.getReedSwData();    
  }

  // won't fire viewDidLoad for componment.
  ionViewDidLoad() {     
  }

  delete(i){
    // this.logSvc.delData.(this.arrData[i].$key);
  }
}
