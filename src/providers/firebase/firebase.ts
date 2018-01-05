import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
// import 'rxjs/add/operator/do';

import { Log } from '../../app/shared/log.model';
import { DhtLog } from '../../app/shared/dhtlog.model';
import { ReedSwLog } from '../../app/shared/reedsw.model';

//import 'rxjs/add/operator/map';

/*
  Generated class for the FirebaseProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FirebaseProvider {
  // note that we have $key property in Log class, so cannot use AngularFireList<Log>
  logList: AngularFireList<any>;
  dhtLogList: AngularFireList<any>;
  reedSwLogList: AngularFireList<any>;

  // selectedLog = new Log();
  constructor(private firebase: AngularFireDatabase) {
    console.log('Hello FirebaseProvider Provider');
    // logs and dht are db collection.
    this.logList = this.firebase.list<Log>('/logs');
    this.dhtLogList = this.firebase.list<DhtLog>('/dht');
    this.reedSwLogList = this.firebase.list<ReedSwLog>('/reedSwtich');
  }

  getData(): Observable<Log[]> {
    console.log('Get Logs');
    let log$: Observable<Log[]> = this.logList.valueChanges();
    return log$;
  }

  addLog(log: Log) {  
    this.logList.push({
      topic: log.topic,
      message: log.message,
      timeStamp: new Date().toLocaleString(),      
    });
  }

  updateLog(log: Log) {
    this.logList.update(log.$key, {
      topic: log.topic,
      message: log.message,
      timeStamp: log.timeStamp,      
    })
  }

  deleteLog(key: string) {
    this.logList.remove(key);
  }

  // for dht logs 
  // selectedLog = new Log();

  getDhtData(): Observable<DhtLog[]> {
    console.log('Get DhtLogs');
    return this.dhtLogList.valueChanges()
      //.do(res=>console.log(res));    
  }

  addDhtLog(log: DhtLog) {
    console.log('add a log', log.timeStamp);
    this.dhtLogList.push({
      h: log.h,
      t: log.t,
      timeStamp: new Date().toLocaleString(),     
    });
  }

  updateDhtLog(log: DhtLog) {
    this.dhtLogList.update(log.$key, {
      h: log.h,
      t: log.t,
      timeStamp: log.timeStamp,      
    })
  }

  deleteDhtLog(key: string) {
    //this.DhtlogList.remove(key);
  }

  addReedSwLog(log: ReedSwLog) {
    console.log('add a log', log.timeStamp);
    this.reedSwLogList.push({
      doorNumber: log.doorNumber,
      timeStamp: new Date().toLocaleString(),     
    });
  }
  getReedSwData(): Observable<ReedSwLog[]> {
    console.log('Get ReedSwLogs');
    return this.reedSwLogList.valueChanges()
      //.do(res=>console.log(res));    
  }

}
