import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
// import { Chart } from 'angular-highcharts';
// import * as HighCharts from 'highcharts';
// Load the exporting module.

/**
 * Generated class for the Dht11Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-dht11',
  templateUrl: 'dht11.html',
})
export class Dht11Page {
  // chart: Chart; 
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }
  add() {
    //this.chart.addPoint(Math.floor(Math.random() * 10));
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad Dht11Page');
    // generate the chart
  
  }
}
