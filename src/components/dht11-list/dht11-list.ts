import { Component } from '@angular/core';
import { AngularFireList } from 'angularfire2/database';
// import { Chart } from 'angular-highcharts';
// import * as HighCharts from 'highcharts';
// import * as HighStock from 'highcharts/highstock';
// import {FirebaseProvider} from '/providers/firebase/firebase.ts';
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
  t: 't';
  h: 'h';
  dhtLogList: AngularFireList<DhtLog>;
  // chart: Chart;
  // overide options type with <any>
  // logsH: Array<number>;
  // logsT: Array<number>;
  // logsTimeStamp: Array<string>;
  /*
  chart = new Chart({
    chart: {
      type: 'line'
    },
    title: {
      text: 'Temperature/Humidity'
    },
    credits: {
      enabled: false
    },
    xAxis: {
      categories: ['Apples', 'Bananas', 'Oranges']
    },
    yAxis: {
      title: {
        text: 'Fruit eaten'
      }
    },
    series: [{
      name: 'temperature',
      data: []
    }, {
      name: 'humidity',
      data: []
    }]
  });
  */
  constructor(private dhtLogSvc: FirebaseProvider) {
    console.log('dht11-list component');
    this.dhtLogs$ = this.dhtLogSvc.getDhtData()
    // this.chart.addPoint()
  }
/*
  displayChart() {
    HighCharts.setOptions({ global: { useUTC: false } });

    HighCharts.chart('container', {
      chart: {
        type: 'spline',
        panning: true,
        events: {
          load() {

          }
        },
        zoomType: 'x'
      },
      title: {
        text: 'Temperature/Humidity',
        style: {
          color: '#f45b5b'
        }
      },
      xAxis: {
        type: 'datetime',
        categories: this.logsTimeStamp
      },
      yAxis: {
        title: {
          text: 'Temperature/Humidity'
        }
      },
      series: [{
        name: 'temperature',
        data: this.logsT
      }, {
        name: 'humidity',
        data: this.logsH
      }]
    });
  }
*/
}