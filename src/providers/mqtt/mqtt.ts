import { Injectable } from '@angular/core';
// import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { FirebaseProvider } from '../../providers/firebase/firebase';
import * as mqtt from 'mqtt';

import { DhtLog } from '../../app/shared/dhtlog.model';
// import { Log } from '../../app/shared/log.model';
/*
  Generated class for the MqttProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MqttProvider {
  client: mqtt.MqttClient;
  t: string;
  h: string;
  constructor(private logSvc: FirebaseProvider) {    
    
  }

  connect2Broker(): mqtt.Client {
    //return this.client = mqtt.connect('ws://broker.mqttdashboard.com:8000/mqtt', {
    return this.client = mqtt.connect('ws://broker.mqttdashboard.com:8000/mqtt', {
      //return this.client = mqtt.connect('ws://test.mosquitto.org:1883', {
      // return this.client = mqtt.connect('mqtt://ajoan.com:1883', {
      protocolId: 'MQIsdp',
      protocolVersion: 3
    });
  }

  init() {
    console.log('connecting to mqtt broker...');
    this.client = this.connect2Broker();

    this.client.on('connect', () => {
      console.log('MQTT Connected');
    });

    this.client.on('message', (topic, message) => {
      let log = new DhtLog();
      // message is Buffer     
      console.log(`Msg: ${message}, Topic: ${topic}`);

      switch (topic) {
        case '/clsa27f/t':
          this.t = message.toString();
          break;
        case '/clsa27f/h':
          log.h = message.toString();
          log.t = this.t;
          // if (log.t !== undefined && log.h !== undefined) {
            console.log('start writing...\n');
            this.logSvc.addDhtLog(log);
            //dbCtrl.writeDhtData(th);
            // client.end()
          // };
          break;
      }
    });
  }

  sub(topic: string) {
    this.client.subscribe(topic);
  };

  pub(topic: string, message: string) {
    this.client.publish(topic, message);
  };

  unsub(topic: string) {
    this.client.unsubscribe(topic);
  }
}
