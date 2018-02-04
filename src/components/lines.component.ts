import { Component, Input, OnChanges, ElementRef, AfterViewInit, ViewChild } from '@angular/core';
// import { IonicPage, NavController, NavParams } from 'ionic-angular';
// Loads the code needed to manipulate the visualization
import { LinesChart } from './lines-chart';
import { DhtLog } from '../app/shared/dhtlog.model';
import * as D3 from 'd3/index';
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

    dataSet: DhtLog[];
    // Gets a reference to the child DOM node
    @ViewChild('target') target;
    // An instance of the LinesChart object
    chart: LinesChart;
    host;
    svg;
    // elementRef enables us directly access to the DOM
    @Input()
    values: Observable<DhtLog[]>;
    dhtChart: string;
    constructor(private _element: ElementRef) {
        this.host = D3.select(this._element.nativeElement);
    }
    // Lifecycle hook that is invoked when data-bound properties change
    ngOnChanges(changes) {
        /*
        this.setup();
        this.buildSVG();
        this.populate()
        this.drawXAxis();
        this.drawYAxis();
        */
        if (this.chart) {
            this.chart.render(changes.values, this.dhtChart);
        }
    }
    // Lifecycle hook for when the component's view has been fully initialized
    ngAfterViewInit() {
        this.buildSVG();
        console.log('line-component view init');
        // We have to wait until the view has been initialized before we can get the
        // DOM element to bind the chart to it
        this.chart = new LinesChart(this.target.nativeElement, this.w, this.h, this.padding);
        this.values.subscribe((log) => {
            this.chart.render(log, this.dhtChart);
        });
    }
    buildSVG(): void {
        this.host.html('');
        this.svg = this.host.append('svg')
            .attr('width', this.w)
            .attr('height', this.h)
            .style('background-color', 'blue');
    }
}
