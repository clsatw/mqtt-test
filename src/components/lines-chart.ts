import * as d3 from "d3";

export class LinesChart {
    target: HTMLElement;
    // svg h and w
    h: number;
    w: number;
    padding: number;
    margin;
    xScale;
    yScale;
    //xAxis;
    //yAxis;
    svg;
    // values;
    constructor(target: HTMLElement, w: number) {
        this.target = target;
        this.w = w;
        this.h = w * 0.6;
        // this.padding = padding;
    }
    // coz we will convert timeStamp to date fromat from string, values has to be Array<any>, instead of
    // Array<DhtLog>
    setup() {
        this.margin = {
            top: 15,
            right: 50,
            bottom: 40,
            left: 50
        }
        this.padding = 40;
        //this.w = this.target.clientWidth - this.margin.left - this.margin.right;
        //this.h = this.w * 0.6 - this.margin.bottom - this.margin.top;      

    }

    buildSVG() {
        // Create SVG element
        this.svg = d3.select(this.target)
            .append("svg")
            .attr("width", this.w) // + this.margin.left + this.margin.right)
            .attr("height", this.h) // + this.margin.top + this.margin.bottom)
        //.append('g')
        //.attr('transofrm', 'translate(' + this.margin.left + ',' + this.margin.top + ')');
        // .style('background', '#4ff4f4')
    }

    drawXAxis() {
        let xAxis = d3.axisBottom(this.xScale)
            // .ticks(5)
            .tickPadding(15)
            // refer to http://www.oxxostudio.tw/articles/201412/svg-d3-11-time.html
            .tickFormat(d3.timeFormat("%H-%e-%m-%y"))
        /*
        ** In SVG land, a g element is a group element. Groupelements are invisible,
        ** unlike line, rect, and circle, and theyhave no visual presence themselves.
        ** Yet they help us in two ways: first,g elements can be used to contain (or “group”) other elements,
        ** whichkeeps our code nice and tidy. Second, we can apply transformations tog elements,
        ** which affects how visual elements within that group (suchas lines, rects, and circles) are rendered. 
        */
        this.svg.append("g")
            .attr("class", "axis")
            // .attr("transform", "translate(" + this.padding + ",0)")
            .attr('transform', 'translate(0, ' + (this.h - this.padding) + ')')
            /* 
            ** D3’s call() function takes the incoming selection, as received from the prior link in the chain,
            ** and hands that selection off to any function. In this case, the selection is our new g group element.
            ** Although the g isn’t strictly necessary, we are using it because the axis function is about to generate
            ** lots of crazy lines and numbers, and it’s nice to contain all those elements within a single group object.
            ** call() hands off g to the xAxis function, so our axis is generated within g.
            */
            .call(xAxis)

            .append('text')
            .attr('class', 'label')
            .attr('x', this.w)
            .attr('y', 0)
            .attr('text-anchor', 'end')
            //.sytle('fill', 'grey')
            .text('時間');

    }

    drawYAxis() {
        let yAxis = d3.axisLeft(this.yScale)
            .ticks(5)
            .tickPadding(10)
        this.svg.append("g")
            .attr("class", "axis")
            .attr("transform", "translate(" + this.padding + ",0)")
            .call(yAxis)
            .append('text')

            .attr('class', 'label')
            .attr('transform', 'rotate(-90)')
            .attr('x', 0 - (this.h / 2))
            .attr('y', 0)
            // .attr('y', 0 - this.padding)
            .attr('dy', '1em')
            //.sytle('fill', 'red')
            .text('溫度');

    }

    populate(values: Array<any>, definedChart) {
        // scaling
        this.xScale = d3.scaleTime()
            .domain([
                d3.min(values, (d) => { return d.timeStamp }),
                d3.max(values, (d) => { return d.timeStamp })
            ])
            .range([this.padding, this.w - this.padding])

        this.yScale = d3.scaleLinear()
            .domain([0, d3.max(values, (d) => { return d['h']; })])
            .range([this.h - this.padding, this.padding])
            .nice();    // make axis end in round number

        //Define line generator
        let line = d3.line()
            // filt out the readings of humidity < 0;
            // .defined((d) => { return d['h'] >= 0 && d['t'] <= 35 })
            .x((d) => {
                return this.xScale(d['timeStamp']);
            })
            .y((d) => {
                return this.yScale(d[definedChart]);
            });

        //Create line
        this.svg.append("path")
            //.on('click', (d) => {
            //    alert('temperture: ' + d[definedChart])
            //})
            .datum(values)
            .attr("class", "line")
            .attr("d", line)
            .filter((d) => {
                //Filter current selection of all paragraphs
                return d[definedChart] < 35;
                //Returns true only if d > 35
            })  //New selection of filtered elements is handed off here
            .style("stroke", "red");  //Applies only to elements in the filtered selection
    }

    render(values: Array<any>, definedChart: string) {
        let parseTime = d3.timeParse('%c');
        values.forEach((d) => {
            d['timeStamp'] = parseTime(d.timeStamp);
            // d['h'] = +d['h'];
            // d['t'] = +d['t'];
        });

        this.setup();
        this.buildSVG();
        this.populate(values, definedChart)
        this.drawXAxis();
        this.drawYAxis();

        console.table(values, ['h', 't', 'timeStamp']);
        /*        
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



    }
    destory() {

    }
}
