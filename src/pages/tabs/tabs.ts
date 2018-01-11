import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the TabsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {
  tab1Root: any;
  tab2Root: any;
  tab3Root: any;
  tab4Root: any;
  tab5Root: any;
  tab6Root: any;
  // tab6Root: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    // lazy loading, no need to import classes below:
    this.tab1Root = 'HomePage';
    this.tab2Root = 'ControlPage';
    this.tab3Root = 'LogPage';
    this.tab4Root = 'AboutPage';
    this.tab5Root = 'ContactPage';
    this.tab6Root = 'ColorPickerPage';
    console.log(this.navCtrl.id);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TabsPage');
  }

}
