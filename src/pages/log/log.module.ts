import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LogPage } from './log';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    LogPage,
  ],
  imports: [
    // for lazy loading
    IonicPageModule.forChild(LogPage),
    ComponentsModule
  ],
  exports: [
    LogPage
  ]
})
export class LogPageModule {}
