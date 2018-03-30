import { Component, ElementRef, ViewChild,  } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { FirebaseProvider } from '../../providers/firebase/firebase';
import { Gyroscope, GyroscopeOrientation, GyroscopeOptions } from '@ionic-native/gyroscope';
import { DeviceMotion, DeviceMotionAccelerationData } from '@ionic-native/device-motion';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/throttleTime';
import 'rxjs/add/operator/distinct';
import 'rxjs/add/operator/mapTo';
import 'rxjs/add/operator/takeUntil';
import 'rxjs/add/operator/concatAll';
import 'rxjs/add/operator/concatMap';
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
  @ViewChild('tv') tv: ElementRef;
  msg: string;
  mqttMsg = {
    x: 'n/a',
    y: 'n/a',
    z: 'n/a'
  };
  options: GyroscopeOptions = {
    frequency: 1000
  };

  constructor(private el: ElementRef, private mqtt: MqttProvider, private logSvc: FirebaseProvider,
    public navCtrl: NavController, public navParams: NavParams,
    private platform: Platform, private gyroscope: Gyroscope,
    private deviceMotion: DeviceMotion) {
  }

  ionViewDidLoad() {  
    console.log('ionViewDidLoad ControlPage');
    let btn = document.querySelector('#btn0');
    const btnTvOn$ = Observable.fromEvent(btn, 'click').mapTo('1');
    btn = document.querySelector('#btn1');
    const btnTvOff$ = Observable.fromEvent(btn, 'click').mapTo('0');

    // const btnTvOff$ = Observable.fromEvent(this.btnCtrls[1].nativeElement, 'click').mapTo('0');
    Observable.merge(btnTvOn$, btnTvOff$)
      .throttleTime(1000)
      .distinctUntilChanged()
      .do(e => console.log(e))
      .subscribe(e => {
        this.msg = e; // for selected btn class
        this.ctrlGpio(e);
      })

    let parent = document.getElementById('parent');
    let target = <HTMLElement>document.getElementById('tv');
    const mouseDown$ = Observable.fromEvent(target, 'mousedown');
    const mouseMove$ = Observable.fromEvent<MouseEvent>(parent, 'mousemove');
    const mouseUp$ = Observable.fromEvent(parent, 'mouseup');
    
    const drag$ = mouseDown$.concatMap(() => mouseMove$.takeUntil(mouseUp$));
    drag$.subscribe(e => {
      // console.log(this.tv.nativeElement);
      target.style.top = e.clientY-75 + 'px';
      // this.tv.nativeElement.style.left = e.clientX + 'px';
      target.style.left = e.clientX-22 + 'px';
      
      console.log(e);
    })
    
    /*
    let drag$ = mouseDown$.map(e=>{
      return mouseMove$.takeUntil(mouseUp$)
    }).concatAll();
    drag$.forEach(e=>{
      target.style.top = e.clientY + 'px';      
      target.style.left = e.clientX + 'px';
    });
    */
  }

  /*
    

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
    // have to create feed on https://io.adafruit.com/giraftw2002/feeds before publishing coz
    // adafruit is not allowed dynamic publish.
    /*
    log.topic = `${this.mqtt.aio_username}/f/tv`;
    try {
      this.mqtt.pub(log.topic, msg);
    } catch (e) {
      throw e;
    }
    log.message = msg;
    this.logSvc.addLog(log);
    */
  }
}
