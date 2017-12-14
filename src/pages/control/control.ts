import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { FirebaseProvider } from '../../providers/firebase/firebase';
import { Gyroscope, GyroscopeOrientation, GyroscopeOptions } from '@ionic-native/gyroscope';
import { DeviceMotion, DeviceMotionAccelerationData } from '@ionic-native/device-motion';

import { Log } from '../../app/shared/log.model';
import { MqttProvider } from '../../providers/mqtt/mqtt';

/**
 * Generated class for the ControlPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-control',
  templateUrl: 'control.html',
})
export class ControlPage {
  msg: string;
  mqttMsg = {
    x: 'n/a',
    y: 'n/a',
    z: 'n/a'
  };
  options: GyroscopeOptions = {
    frequency: 1000
  };

  constructor(private mqtt: MqttProvider, private logSvc: FirebaseProvider,
    public navCtrl: NavController, public navParams: NavParams,
    private platform: Platform, private gyroscope: Gyroscope,
    private deviceMotion: DeviceMotion) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ControlPage');
    if (this.mqtt.client.connected) {
      console.log('MQTT Connected');
      this.mqtt.sub('clsa/27f/x');
      this.mqtt.sub('clsa/27f/y');
      this.mqtt.sub('clsa/27f/z');
      this.mqtt.sub('clsa/27f/IT');
    }
    /*
    this.mqtt.client.on('message', (topic, message) => {
      // message is Buffer
      console.log(`Msg: ${message}, Topic: ${topic}`);
      let log = new Log();
      log.message = message.toString();
      log.topic = topic.toString();   

      // this.topic = topic;
      switch (topic) {      
        case 'clsa/27f/x':
          this.mqttMsg.x = log.message;
          break;
        case 'clsa/27f/y':
          this.mqttMsg.y = log.message;
          break;
        case 'clsa/27f/z':
          this.mqttMsg.z = log.message;
          break;
      }
      // client.end()
    });
    */
    
    if (this.platform.is('cordova')) {
      this.gyroscope.getCurrent(this.options)
        .then((orientation: GyroscopeOrientation) => {
          console.log(orientation.x, orientation.y, orientation.z, orientation.timestamp);
          this.mqttMsg.x = orientation.x.toString();
          this.mqttMsg.y = orientation.y.toString();
          this.mqttMsg.z = orientation.z.toString();
        })
        .catch()

      this.gyroscope.watch()
        .subscribe((orientation: GyroscopeOrientation) => {
          console.log(orientation.x, orientation.y, orientation.z, orientation.timestamp);
          this.mqtt.pub('clsa/27f/x', orientation.x.toString());
          this.mqtt.pub('clsa/27f/y', orientation.y.toString());
          this.mqtt.pub('/clsa/27f/z', orientation.z.toString());
        });

      /* Get the current acceleration along the x, y, and z axes.    
      this.mqtt.subscription = this.deviceMotion.watchAcceleration().subscribe((acceleration: DeviceMotionAccelerationData) => {
        console.log(acceleration);
      });
      */
    } else {
      console.log('not on a real device');
      this.mqttMsg.x = 'not on a real device';
      this.mqttMsg.y = 'not on a real device';
      this.mqttMsg.z = 'not on a real device';
    }
  }

  ionViewDideave() {
    this.mqtt.unsub('clsa/27f/x');
    this.mqtt.unsub('clsa/27f/y');
    this.mqtt.unsub('clsa/27f/z');
    this.mqtt.unsub('clsa/27f/IT');
  }
  // may be it should be named by <device>@<location>, eg., tv@livingroom
  ctrlGpio(msg: string) {
    let log = new Log();
    console.log('timestamp', log.timeStamp);

    this.mqtt.client.publish('clsa/27f', msg);
    log.topic = 'clsa/27f';
    log.message = msg;    
    this.logSvc.addLog(log);
  }
}
