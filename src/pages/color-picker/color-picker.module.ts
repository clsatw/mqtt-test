import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ColorPickerPage } from './color-picker';
//import {ColorPickerModule, ColorPickerService}  from 'ngx-color-picker';

import {ColorPicker} from './cp';

@NgModule({
  declarations: [  
    ColorPickerPage,
    ColorPicker,
  ],
  imports: [
    IonicPageModule.forChild(ColorPickerPage),

  ],
  exports: [
    ColorPicker
  ],
 
})
export class ColorPickerPageModule { }
