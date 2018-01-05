import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
// import { ChartModule } from 'angular-highcharts';

import { AngularFireModule } from 'angularfire2'
import { AngularFireDatabaseModule } from 'angularfire2/database'

import { CONFIG } from "./firebase.details";

import { MyApp } from './app.component';

// lazy loading so we don't need to import any pages or components

import { DeviceMotion } from '@ionic-native/device-motion';
import { Gyroscope } from '@ionic-native/gyroscope';
import { MqttProvider } from '../providers/mqtt/mqtt';
import { FirebaseProvider } from '../providers/firebase/firebase';
// import { RestProvider } from '../providers/rest/rest';
import { SmsProvider } from '../providers/sms/sms';
import { SMS } from '@ionic-native/sms';

// The most important @NgModuledecorator annotates the top-level AppModule class.
@NgModule({
  declarations: [
    MyApp,
    // no need to add HomePage and LogPage or components here coz of lazyloading    
  ],
  imports: [
    BrowserModule,
    // FormsModule,
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
    // RestProvider,
    SMS,
    SmsProvider

  ]
})
export class AppModule { }
