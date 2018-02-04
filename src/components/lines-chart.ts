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
    // coz we will convert timeStamp to date fromat from string, values has to be Array<any>, instead of
    // Array<DhtLog>
    render(values: Array<any>, definedChart: string) {
        let parseTime = d3.timeParse('%c');
        values.forEach((d) => {
            d['timeStamp'] = parseTime(d['timeStamp']);
            // d['h'] = +d['h'];
            // d['t'] = +d['t'];
        });

        console.table(values, ['h', 't', 'timeStamp']);
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
                    return d[definedChart];
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
            .ticks(5);

        let xAxis = d3.axisBottom(xScale)
        // .ticks(5);
        // .ticks(d3.timeDays)
        // .tickFormat(d3.timeFormat('%m/%d'));

        //Define line generator
        let line = d3.line()
            // filt out the readings of humidity < 0;
            // .defined((d) => { return d['h'] >= 0 && d['t'] <= 35 })
            .x((d) => {
                return xScale(d['timeStamp']);
            })
            .y((d) => {
                return yScale(d[definedChart]);
            });

        /*
        let dangerline = d3.area()
            // filt out the readings of humidity < 0;
            .defined((d) => { return d['h'] >= 0 && d['t'] > 35 })
            .x((d) => {
                return xScale(d['timeStamp']);
            })
            .y0((d) => { return yScale.range()[0]; })
            .y1((d) => {
                return yScale(d['h']);
            });
        */

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
            .attr("d", line)
            .filter(function (d) {
                //Filter current selection of all paragraphs
                return d[definedChart] < 35;
                //Returns true only if d > 35
            })  //New selection of filtered elements is handed off here
            .style("stroke", "red");  //Applies only to elements in the filtered selection


        /*
                svg.append("path")
                    .datum(values)
                    .attr("class", "h")
                    .attr("d", dangerLine)
        */
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


    }
    destory() {

    }
}
