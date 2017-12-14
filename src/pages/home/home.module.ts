import { NgModule } from '@angular/core';
// ionicpagemodule is for lazy loading
import { IonicPageModule } from 'ionic-angular';
import { HomePage } from './home';

@NgModule({
  declarations: [
    HomePage,
  ],
  imports: [
    IonicPageModule.forChild(HomePage),    
  ],
  exports: [
    HomePage
  ]
})
export class HomePageModule {}
