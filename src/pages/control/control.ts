import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { FirebaseProvider } from '../../providers/firebase/firebase';
import { Gyroscope, GyroscopeOrientation, GyroscopeOptions } from '@ionic-native/gyroscope';
import { DeviceMotion, DeviceMotionAccelerationData } from '@ionic-native/device-motion';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/throttleTime';
import 'rxjs/add/operator/distinct';
import 'rxjs/add/operator/mapTo';

import 'rxjs/add/operator/do';
import 'rxjs/add/observable/fromEvent';

import { Log } from '../../app/shared/log.model';
import { MqttProvider } from '../../providers/mqtt/mqtt';
// import { Element } from '@angular/compiler';

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
  aio_username = 'giraftw2002';
  constructor(private mqtt: MqttProvider, private logSvc: FirebaseProvider,
    public navCtrl: NavController, public navParams: NavParams,
    private platform: Platform, private gyroscope: Gyroscope,
    private deviceMotion: DeviceMotion) {
  }

  ngOnInit() { 
    console.log('oninit');
    console.log('ionViewDidLoad ControlPage');
    let btn = document.querySelector('#btn0');
    const btnTvOn$ = Observable.fromEvent(btn, 'click').mapTo('1');
    btn = document.querySelector('#btn1');
    const btnTvOff$ = Observable.fromEvent(btn, 'click').mapTo('0');
    
    // const btnTvOff$ = Observable.fromEvent(this.btnCtrls[1].nativeElement, 'click').mapTo('0');
    Observable.merge(btnTvOn$, btnTvOff$)    
      .throttleTime(1000)
      .distinctUntilChanged()
      .do(e=>console.log(e))
      .subscribe(e => {
        this.msg = e; // for selected btn class
        this.ctrlGpio(e);         
      })
  }

  /*
  ionViewDidLoad() {   

    if (this.mqtt.client.connected) {
      console.log('ctrl page: MQTT Connected');
      // this.mqtt.sub(`${this.aio_username}/f/CLSA/#`);
      // this.mqtt.sub(`${this.aio_username}/f/CLSA/27f/y`);
      // this.mqtt.sub(`${this.aio_username}/f/CLSA/27f/z`);
      // this.mqtt.sub('giraftw2002/f/CLSA/27f/IT');
      this.mqtt.sub('giraftw2002/errors');
      this.mqtt.sub('giraftw2002/f/CLSA/#');
      this.mqtt.sub('giraftw2002/throttle');
    }
    

    
    this.mqtt.client.on('message', (topic, message) => {
      // message is Buffer
      console.log(`Msg: ${message}, Topic: ${topic}`);
      let log = new Log();
      log.message = message.toString();
      log.topic = topic.toString();   

      // this.topic = topic;
      switch (topic) {      
        case 'CLSA/27f/x':
          this.mqttMsg.x = log.message;
          break;
        case 'CLSA/27f/y':
          this.mqttMsg.y = log.message;
          break;
        case 'CLSA/27f/z':
          this.mqttMsg.z = log.message;
          break;
      }
      // client.end()
    });
    

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
          this.mqtt.pub(`${this.aio_username}/f/CLSA/27f/x`, orientation.x.toString());
          this.mqtt.pub(`${this.aio_username}/f/CLSA/27f/y`, orientation.y.toString());
          this.mqtt.pub(`${this.aio_username}/f/CLSA/27f/z`, orientation.z.toString());
        });

      // Get the current acceleration along the x, y, and z axes.    
      // this.mqtt.subscription = this.deviceMotion.watchAcceleration().subscribe((acceleration: DeviceMotionAccelerationData) => {
      //  console.log(acceleration);
      // });
      
    } else {
      console.log('not on a real device');
      this.mqttMsg.x = 'not on a real device';
      this.mqttMsg.y = 'not on a real device';
      this.mqttMsg.z = 'not on a real device';
    }
  }
  */

/*
  ionViewDideave() {
    this.mqtt.unsub(`${this.aio_username}/f/CLSA/27f/x`);
    this.mqtt.unsub(`${this.aio_username}/f/CLSA/27f/y`);
    this.mqtt.unsub(`${this.aio_username}/f/CLSA/27f/z`);
    this.mqtt.unsub(`${this.aio_username}/f/CLSA/27f/IT`);
  }
  */

  // may be it should be named by <device>@<location>, eg., tv@livingroom
  // msg: '1' or '0'
  ctrlGpio(msg: string) {
    let log = new Log();
    // console.log('timestamp', log.timeStamp);

    this.mqtt.client.publish("giraftw2002/f/tv", msg);
    log.topic = `${this.aio_username}/f/CLSA/27f`;
    log.message = msg;
    this.logSvc.addLog(log);
  }
}
