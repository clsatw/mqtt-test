import { DhtLog } from '../app/shared/dhtlog.model';
import * as d3 from "d3";

export class LinesChart {
    target: HTMLElement;
    // svg h and w
    h: number;
    w: number;
    padding: number;
    constructor(target: HTMLElement, w: number, h: number, padding: number) {
        this.target = target;
        this.h = h;
        this.w = w;
        this.padding = padding;
    }
    render(values: Array<any>) {
        let parseTime = d3.timeParse('%c');
        values.forEach((d) => {
            console.log(d['timeStamp']);
            d['timeStamp'] = parseTime(d['timeStamp']);
            // d['timeStamp'] = d3.timeParse('2018-02-03T00:00:00Z');
            d['h'] = +d['h'];
            d['t'] = +d['t'];
            console.log(d['timeStamp']);
        });

        console.log('values:', values);
        /*
                let scale = d3.scaleLinear()
                    .domain(
                    // return min and max of values
                    d3.extent(values, (d) => {
                        return d;
                    })
                    )
                    .range([this.padding, this.w - this.padding * 2]);
        */
        let yScale = d3.scaleLinear()
            .domain([
                0,
                d3.max(values, (d) => {
                    return d['t'];
                    //return d;
                })
            ])
            .range([this.h - this.padding, this.padding])
            .nice();

        let xScale = d3.scaleTime()
            .domain([
                d3.min(values, (d) => { return d.timeStamp }),
                d3.max(values, (d) => { return d.timeStamp })
            ])
            .range([this.padding, this.w - this.padding])

        let yAxis = d3.axisLeft(yScale)
            //.scale(yScale)
            //.orient('left')
            .ticks(5);

        let xAxis = d3.axisBottom(xScale)
        // .ticks(5);
        //.scale(xScale)
        // .ticks(d3.timeDays)
        // .tickFormat(d3.timeFormat('%m/%d'));

        /*
                let drawLine = d3.line(
                    .x((d) => {
                        return xScale(d['timeStamp']);
                    })
                    .y((d) => {
                        return yScale(d['t']);
                    })
                )
             
        */
        //Define line generator
        let line = d3.line()
            .x((d) => {
                console.log(d['timeStamp']);
                return xScale(d['timeStamp']);
                //return d['timeStamp']
            })
            .y((d) => {
                console.log(d['h']);
                return yScale(d['h']);
            });
        // return d['h'];


        // Create SVG element
        let svg = d3.select(this.target)
            .append("svg")
            .attr("width", this.w)
            .attr("height", this.h)
            .style('background', '#4ff4f4')

        //Create line
        svg.append("path")
            .datum(values)
            .attr("class", "line")
            .attr("d", line);

        // Create X axis
        svg.append('g')
            .attr('class', 'aixs')  // assign 'axis' class
            // translate is to push the xAxis down from top
            .attr("transform", "translate(0," + (this.h - this.padding) + ")")
            // hands off g to the xAxis func, so our axis is generated within g element.
            .call(xAxis)

        // Create Y axis
        svg.append("g")
            .attr("class", "axis")
            .attr("transform", "translate(" + this.padding + ",0)")
            .call(yAxis);


        //svg.append('path')
        //    .attr('d', drawLine(values));

        /* working  
        var dataset = [ 5, 10, 15, 20, 25 ];
            let svg = d3.select('.chart')
                // let svg = d3.select('.chart')
                .append('svg')
                .attr('width', this.w)
                .attr('height', this.h)
    
            let circles = svg.selectAll('circle')
                .data(dataset)
                .enter()
                .append("circle")
    
            circles.attr("cx", function (d, i) {
                    return (i * 50) +25;
                })
                .attr("cy", this.h/2) 
                .attr("r", (d)=>{
                    return d});
                
      
        var dataset = [
            [5, 20], [480, 90], [250, 50], [100, 33], [330, 95],
            [410, 12], [475, 44], [25, 67], [85, 21], [220, 88]
        ];

        //Create SVG element
        var svg = d3.select(".chart")
            .append("svg")
            .attr("width", this.w)
            .attr("height", this.h);

        svg.selectAll("circle")  // <-- No longer "rect"
            .data(dataset)
            .enter()
            .append("circle")     // <-- No longer "rect"
            .attr("cx", function (d) {
                return d[0];
            })
            .attr("cy", function (d) {
                return d[1];
            })
            .attr("r", function (d) {
                return Math.sqrt(300 - d[1]);
            });

        svg.selectAll("text")  // <-- Note "text", not "circle" or "rect"
            .data(dataset)
            .enter()
            .append("text")     // <-- Same here!
            .text(function (d) {
                return d[0] + "," + d[1];
            })
            .attr("x", function (d) {
                return d[0];
            })
            .attr("y", function (d) {
                return d[1];
            })
            .attr("font-family", "sans-serif")
            .attr("font-size", "11px")
            .attr("fill", "red");
        */
    }
    destory() {

    }
}
