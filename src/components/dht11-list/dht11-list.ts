import { Component } from '@angular/core';
import { AngularFireList } from 'angularfire2/database';

import { Observable } from 'rxjs/Observable';
import { FirebaseProvider } from '../../providers/firebase/firebase';
import { DhtLog } from '../../app/shared/dhtlog.model';

// import it from components.module.ts is enough
// import { ReversePipe} from '../../app/shared/pipe-reverse';

/**
 * Generated class for the Dth11ListComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'dht11-list',
  templateUrl: 'dht11-list.html'
})
export class Dht11ListComponent {
  dhtLogs$: Observable<DhtLog[]>;
  dhtLogList: AngularFireList<DhtLog>;

  constructor(private dhtLogSvc: FirebaseProvider) {
    console.log('dht11-list component');
    this.dhtLogs$ = this.dhtLogSvc.getDhtData()
    // this.chart.addPoint()
  }
}