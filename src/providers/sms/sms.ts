import { Injectable } from '@angular/core';
import { SMS } from '@ionic-native/sms';
import { ToastController } from 'ionic-angular';
import 'rxjs/add/operator/map';

/*
  Generated class for the SmsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SmsProvider {
  // phoneNumber: number;
  // textMsg: string = 'door #1 got opened.'
  constructor(private sms: SMS, private toast: ToastController ) {
    console.log('Hello SmsProvider Provider');
  }

  async sendTextTextMsg(phoneNumber: number, txtMsg: string) {
    try {
      await this.sms.send(String(phoneNumber), txtMsg);
      const toast = this.toast.create({
        message: 'Text was sent!',
        duration: 3000
      });
      toast.present();
    } catch (e) {
      const toast = this.toast.create({
        message: 'Text was not sent!',
        duration: 3000
      });
      toast.present();
    }
  }
}
