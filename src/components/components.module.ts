import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { ChartModule } from 'angular-highcharts';

import { LogListComponent } from './log-list/log-list';
import { Dht11ListComponent } from './dht11-list/dht11-list';
// declare components and export them.
@NgModule({
	imports: [
		IonicModule,
		// ChartModule
	],
	// for lazy loading component
	declarations: [LogListComponent,
    Dht11ListComponent, ],
	// export it so the logListComponent will be avilable for other module that import it
	exports: [LogListComponent,
    Dht11ListComponent, ]
})
export class ComponentsModule {}
