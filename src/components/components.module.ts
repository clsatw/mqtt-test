import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
// import { ChartModule } from 'angular-highcharts';

import { LogListComponent } from './log-list/log-list';
import { Dht11ListComponent } from './dht11-list/dht11-list';
import { ReedSwComponent } from './reedsw/reedsw';
import { ReversePipe } from '../app/shared/pipe-reverse';

// declare components and export them.
@NgModule({
	imports: [
		IonicModule,
		// ChartModule
	],
	// for lazy loading component
	declarations: [
		LogListComponent,
		Dht11ListComponent,
		ReedSwComponent,
		ReversePipe
	],
	// export it so the logListComponent will be avilable for other module that import it
	exports: [
		LogListComponent,
		Dht11ListComponent,
		ReedSwComponent,
		ReversePipe
	]
})
export class ComponentsModule { }
