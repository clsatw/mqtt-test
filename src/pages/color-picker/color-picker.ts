import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';

import { MqttProvider } from '../../providers/mqtt/mqtt';
// import { ColorPickerService, Rgba } from 'ngx-color-picker';

// import { ColorPickerModule } from 'ngx-color-picker';

/**
 * Generated class for the ColorPickerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-color-picker',
  templateUrl: 'color-picker.html',
})
export class ColorPickerPage {
  showStyle: boolean = false;
  btnColor: string;
  btnText: string = 'Random Color';
  timer: NodeJS.Timer;
  color: string = '#ff00cc';
  //colorPicker: any;
  rgb: Buffer = new Buffer(3);

  constructor(private mqtt: MqttProvider) {
  }
  getStyle() {
    this.showStyle = !this.showStyle;
    if (this.showStyle) {
      this.btnText = 'Stop Random Color';
      this.timer = setInterval(() => {
        let d = (Math.floor(Math.random() * 1677215) + 1);
        this.color = (+d).toString(16);
        this.setColor('#'+this.color);
      }, 6000);
      return "Green";
    } else {
      this.btnText = 'Random Color';
      clearInterval(this.timer);
      return "Yellow";
    }
  }
  /*
  public onChangeColor(color: string): Cmyk {
    const hsva = this.cpService.stringToHsva(color);

    const rgba = this.cpService.hsvaToRgba(hsva);

    return this.cpService.rgbaToCmyk(rgba);
  }

  public onChangeColorHex8(color: string): string {
    const hsva = this.cpService.stringToHsva(color, true);

    return this.cpService.outputFormat(hsva, 'rgba', null);
  }
*/
  setColor(ev: any) {
    this.color = ev;
    // this.rgb = this.parseColor(this.color);
    console.log(this.color.slice(1, 7));
    try {
      // need to parse string to int of array in arduion
      this.mqtt.pub(`${this.mqtt.aio_username}/f/led`, this.color.slice(1, 7));
    } catch (e) {
      throw e;
    }
  }

  parseColor(input: string): Array<number> {
    var m;
    m = input.match(/^#([0-9a-f]{6})$/i)[1];
    if (m) {
      return [
        parseInt(m.substr(0, 2), 16),
        parseInt(m.substr(2, 2), 16),
        parseInt(m.substr(4, 2), 16)
      ];
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ColorPickerPage');
  }

}
