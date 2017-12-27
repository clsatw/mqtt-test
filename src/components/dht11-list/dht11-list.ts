import { Component } from '@angular/core';
import { AngularFireList } from 'angularfire2/database';
// import { Chart } from 'angular-highcharts';
import * as HighCharts from 'highcharts';
// import * as HighStock from 'highcharts/highstock';
// import {FirebaseProvider} from '/providers/firebase/firebase.ts';
import { Observable } from 'rxjs/Observable';
import { FirebaseProvider } from '../../providers/firebase/firebase';
import { DhtLog } from '../../app/shared/dhtlog.model';
import { ReversePipe} from '../../app/shared/pipe-reverse';

/**
 * Generated class for the Dth11ListComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'dht11-list',
  templateUrl: 'dht11-list.html',  
})
export class Dht11ListComponent {
  dhtLogs$: Observable<DhtLog[]>;
  dhtLogs: any;
  dhtLogList: AngularFireList<DhtLog>;
  // chart: Chart;  
  // overide options type with <any> 
  logsH: Array<number>;
  logsT: Array<number>;
  logsTimeStamp: Array<Date>;
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
    console.log('ionViewDidLoad dht11-Log component');

    this.dhtLogSvc.getDhtData()
      // .do(logs=>console.log(logs))           
      .subscribe(logs => {
        this.dhtLogs = logs;
        this.logsH = logs.map(log => Number(log.h));
        this.logsT = logs.map(log => Number(log.t));
        this.logsTimeStamp = logs.map(log => log.timeStamp);
      })
    // console.dir(this.logsH);

    // this.chart.addPoint()
  }
  displayChart() {
    HighCharts.setOptions({ global: { useUTC: false } });
    
    HighCharts.chart('container', {
      chart: {
        type: 'spline',
        panning: true,
        events: {
          load() {
            /*
            this.setTitle(null, {
              text: 'Built chart in ' + (new Date() - start) + 'ms'
            });
            */
            // this.xAxis[0].setExtremes(0, 7)
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
    //charts.series[0].setData(this.logsT);
    //charts.series[1].setData(this.logsH);
    /*  
    for( let log of this.logsT){     
      console.log(log);
      this.chart.addPoint(Number(log));
    }
    */
  }
}