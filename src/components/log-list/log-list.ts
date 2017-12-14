import { Component } from '@angular/core';
import { AngularFireList } from 'angularfire2/database';
// import {FirebaseProvider} from '/providers/firebase/firebase.ts';
import { Observable } from 'rxjs/Observable';
import { FirebaseProvider } from '../../providers/firebase/firebase';
import { Log } from '../../app/shared/log.model';
/**
 * Generated class for the LogListComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'log-list',
  templateUrl: 'log-list.html'
})
export class LogListComponent {
  logs$: Observable<Log[]>;
  logList: AngularFireList<Log>; 

  constructor(private logSvc: FirebaseProvider) {
    // won't display on console.
    console.log('ionViewDidLoad Log-list component from const');
    this.logs$ = this.logSvc.getData();    
  }

  // won't fire viewDidLoad for componment.
  ionViewDidLoad() {     
  }

  delete(i){
    // this.logSvc.delData.(this.arrData[i].$key);
  }
}
