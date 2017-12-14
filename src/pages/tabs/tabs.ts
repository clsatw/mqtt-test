import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
// import { ControlPage } from '../control/control';
// import { Dht11Page } from '../dht11/dht11';
// import { LogPage } from '../log/log';
// import { ContactPage } from '../contact/contact';
// import { AboutPage } from '../about/about';
// import { HomePage } from '../home/home';

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

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    // lazy loading
    this.tab1Root = 'HomePage';
    this.tab2Root = 'ControlPage';
    this.tab3Root = 'Dht11Page';
    this.tab4Root = 'LogPage';
    this.tab5Root = 'AboutPage';
    this.tab6Root = 'ContactPage';
    console.log(this.navCtrl.id);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TabsPage');
  }

}
