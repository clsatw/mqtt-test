import { Component, Input, OnChanges, AfterViewInit, ViewChild } from '@angular/core';
// import { IonicPage, NavController, NavParams } from 'ionic-angular';
// Loads the code needed to manipulate the visualization
import { LinesChart } from './lines-chart';
import { DhtLog } from '../app/shared/dhtlog.model';
import { Observable } from 'rxjs/Observable';

// Identifies the class as a component directive that will be associated
// with `lines` elements in the DOM, and will include the specified markup as its template
@Component({
    selector: 'lines',
    templateUrl: 'lines.html'
})
export class Lines implements OnChanges {
    w: number = 800;
    h: number = 300
    padding: number = 30;
    // Declares values as a data-bound property
    @Input() values: Observable<DhtLog[]>;
    @Input() dhtChart: string;
    dataSet: DhtLog[];
    // Gets a reference to the child DOM node
    @ViewChild('target') target;
    // An instance of the LinesChart object
    chart: LinesChart;
    constructor() {

    }
    // Lifecycle hook that is invoked when data-bound properties change
    ngOnChanges(changes) {
        if (this.chart) {
            this.chart.render(changes.values, this.dhtChart);
        }
    }
    // Lifecycle hook for when the component's view has been fully initialized
    ngAfterViewInit() {
        console.log('line-component view init');
        // We have to wait until the view has been initialized before we can get the
        // DOM element to bind the chart to it
        this.chart = new LinesChart(this.target.nativeElement, this.w, this.h, this.padding);
        this.values.subscribe((log)=>{
            this.chart.render(log, this.dhtChart);
        });
    }
}
