import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Subscription } from 'rxjs/Subscription';
// import * as mqtt from 'mqtt';
import { MqttProvider } from '../../providers/mqtt/mqtt';
import { MqttClient } from 'mqtt';
// import { ControlPage } from '../control/control';
// import { Dht11Page } from '../dht11/dht11';
// import { LogPage } from '../log/log';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  subscription: Subscription;
  //watch: number;
  client: MqttClient;

  constructor(private navCtrl: NavController, private navParams: NavParams,
    private mqtt: MqttProvider) {
    // subscribe to dht11 sensor data
   
  }

  /*
    getLogDateTime() {
      let log: Log;
      log = new Log();
      let today = new Date();
      log.date = today.getFullYear().toString() + '-' + (today.getMonth() + 1).toString() + '-' + today.getDate().toString();
      log.time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
      return log;
    }
  */

  ionViewDidLoad() {
    console.log('did loaded');
    // let video = document.getElementById('video');
    let myCanvas = <HTMLCanvasElement> document.getElementById('canvas');
    let ctx = myCanvas.getContext('2d');
    // navigator.get = navigator.getUserMedia
    // ctx.fillStyle = "rgb(200,0,0)";
    // ctx.fillRect (10, 10, 55, 50);

    this.mqtt.init();
    // this.mqtt.sub('/clsa/heartbeat');
    // this.mqtt.sub('/clsa/door1');
    // this.mqtt.sub('/clsa27f/t');
    // this.mqtt.sub('/clsa27f/h');
    /*
    setInterval(() => {
      // client.publish('clsa/27f', Math.floor((Math.random() * 10) + 1).toString());
      this.pub('clsa/27f', Math.floor(Math.random()).toString());
    }, 6000);
    */

    // let client  = mqtt.connect('mqtt://test.mosquitto.org')

    // MQTT over WebSockets, secured
    // let client = mqtt.connect('ws://iot.eclipse.org:80/ws');  


  }

  ionViewWillLeave() {
  }
/*
  navigateToLogPage() {
    this.navCtrl.push('LogPage');
  } 
  navigateToControlPage() {
    this.navCtrl.push('ControlPage');
  }
*/
}
