import { Component, OnInit } from '@angular/core';
import { AngularFireList } from 'angularfire2/database';
import { Chart } from 'angular-highcharts';
import * as HighCharts from 'highcharts';
// import {FirebaseProvider} from '/providers/firebase/firebase.ts';
import { Observable } from 'rxjs/Observable';
import { FirebaseProvider } from '../../providers/firebase/firebase';
import { DhtLog } from '../../app/shared/dhtlog.model';

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
  chart: Chart;

  // overide options type with <any> 

  constructor(private dhtLogSvc: FirebaseProvider) {
    console.log('ionViewDidLoad dht11-Log component');
    this.dhtLogs$ = this.dhtLogSvc.getDhtData();
    this.chart = new Chart({
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
        data: [3,6,9]
      }, {
        name: 'humidity',
        data: [5, 7, 3]
      }]
    });
  }

  ngOnInit() {
    console.log("onInit fired");
    /* for some reason these code cannot be moved into constructor
    let myChart = HighCharts.chart('container', {
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
        data: this.dhtLogs$.map(res=>res.reduce)
            }, {
        name: 'humidity',
        data: [5, 7, 3]
      }]
    });
  }
  */
  }

}