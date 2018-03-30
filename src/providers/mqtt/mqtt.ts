import { Injectable } from '@angular/core';
// import { Subject } from 'rxjs/Subject';

import 'rxjs/add/operator/map';
import { FirebaseProvider } from '../../providers/firebase/firebase';
import 'rxjs/add/operator/throttleTime';
import 'rxjs/add/operator/distinct';
import 'rxjs/add/operator/pluck';

import { DhtLog } from '../../app/shared/dhtlog.model';
import { SmsProvider } from '../sms/sms';
import { ReedSwLog } from '../../app/shared/reedsw.model';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

// import { IClientOptions } from 'mqtt';
// import { Log } from '../../app/shared/log.model';
/*
  Generated class for the MqttProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MqttProvider {
  device_id: string = 'wemos0916';
  aRestApiKey: string = '1obqzch8x3e7e626'; 
  constructor(private http: Http, private txtMsg: SmsProvider, private logSvc: FirebaseProvider) {
  }

  callArest(fnName: string): Observable<any> {
    console.log('fnName: ', fnName);
    // this.msg = fnName; // for css
    return this.http.get(`https://pro.arest.io/${this.device_id}/${fnName}?key=${this.aRestApiKey}`)
      .map(res=>res.json())
 
  }
  callArestWithParam(fnName: string, speed: string, maxDist2Wall: string, delay: string) {
    // console.log('speed: ', speed);
    return this.http.get(`https://pro.arest.io/${this.device_id}/?key=${this.aRestApiKey}&params=${speed},${maxDist2Wall},${delay}`)
      .map(res=>res.json())
      .subscribe(console.dir);
  }

  init() {
    let log = new DhtLog();
    setInterval(()=>{
      this.callArest('') 
        .map(res=>res.variables)        
        .subscribe((vars)=>{
          console.log(vars);
          log.h = vars.temperature;
          log.t = vars.humidity;
          this.logSvc.addDhtLog(log);
        });
    }, 1000 * 60 * 60);  
 

    // const reedSwitch$ = subject.asObservable(); 
    /*
    subjec$
      .throttleTime(3000)
      .subscribe(
      (e) => this.txtMsg.sendTextTextMsg('0922719061', 'Intruder!')
      );
    */

  }

}
