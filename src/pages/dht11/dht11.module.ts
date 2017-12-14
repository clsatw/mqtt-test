import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Dht11Page } from './dht11';
import { ComponentsModule } from '../../components/components.module';
import { ChartModule } from 'angular-highcharts'

@NgModule({
  declarations: [
    Dht11Page,
  ],
  imports: [
    ChartModule,
    // lazy loading
    IonicPageModule.forChild(Dht11Page),
    // import components here
    ComponentsModule

  ],
})
export class Dht11PageModule {}
