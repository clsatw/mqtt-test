import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
// import { ChartModule } from 'angular-highcharts';

import { AngularFireModule } from 'angularfire2'
import { AngularFireDatabaseModule } from 'angularfire2/database'

import { CONFIG } from "./firebase.details";

import { MyApp } from './app.component';

// lazy loading so don't import pages or components
// import { HomePage } from '../pages/home/home';
// import { LogPage } from '../pages/log/log';
import { DeviceMotion } from '@ionic-native/device-motion';
import { Gyroscope } from '@ionic-native/gyroscope';
import { MqttProvider } from '../providers/mqtt/mqtt';
import { FirebaseProvider } from '../providers/firebase/firebase';
import { RestProvider } from '../providers/rest/rest';

@NgModule({
  declarations: [
    MyApp,
    // no need to add HomePage and LogPage or components here coz of lazyloading    
  ],
  imports: [
    BrowserModule,
    // ChartModule,
    IonicModule.forRoot(MyApp),
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(CONFIG)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    // no need to add HomePage and LogPage here coz of lazyloading  
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    Gyroscope,
    DeviceMotion,
    MqttProvider,
    FirebaseProvider,
    RestProvider

  ]
})
export class AppModule { }
