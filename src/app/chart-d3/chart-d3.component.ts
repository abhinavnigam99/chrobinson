import { Component, OnInit, Input } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-chart-d3',
  templateUrl: './chart-d3.component.html',
  styleUrls: ['./chart-d3.component.css']
})

export class ChartD3Component implements OnInit {
  selected = 'grouped';
  svg: any; margin = 40;
  width = 1000 - this.margin;
  height = 300 - this.margin;
  data: any; legendsData = ['Delivered', 'Undelivered'];

  constructor() { }
  ngOnInit() {
    d3.csv('assets/bar-chart.csv',
      (d) => {
        return {
          month: d.month,
          deliverd: +d.deliverd,
          undelivered: +d.undelivered,
          total: (+d.deliverd) + (+d.undelivered)
        };
      }).then((data) => {
        this.data = data;
        this.createSvg(this.selected);
      }).catch(err => {
        console.error(err);
      });
  }

  selectChange(event) {
    this.selected = event.target.value;
    d3.select('svg').remove();
    this.createSvg(this.selected);
  }

  createSvg(selected): void {
    this.svg = d3.select('div#svg')
      .append('svg')
      .attr('width', this.width + this.margin)
      .attr('height', this.height + this.margin)
      .append('g')
      .attr('transform', 'translate(' + this.margin + ',' + 10 + ')');

    if (selected === 'grouped') {
      this.drawGrouped();
    } else {
      this.drawStacked();
    }
  }

  drawGrouped() {
    const x0 = d3.scaleBand().rangeRound([0, this.width]).paddingInner(0.1);
    const x1 = d3.scaleBand().padding(0.05);
    const y = d3.scaleLinear().rangeRound([this.height, 0]);
    const z = d3.scaleOrdinal().range(['#33FFD1', '#338AFF']);

    const keys = this.data.columns.slice(1);
    x0.domain(this.data.map((d) => d.month));
    x1.domain(keys).rangeRound([0, x0.bandwidth()]);
    y.domain([0, d3.max(this.data, (d) => d3.max(keys, (key: string) => +d[key]))]).nice();
    this.svg.append('g')
      .selectAll('g')
      .data(this.data)
      .enter()
      .append('g')
      .attr('class', 'bar')
      .attr('transform', (d) => 'translate(' + x0(d.month) + ',0)')
      .selectAll('rect')
      .data((d) => keys.map((key) => ({ key, value: d[key] })))
      .enter()
      .append('rect')
      .attr('x', (d) => x1(d.key))
      .attr('y', (d) => y(d.value))
      .attr('width', x1.bandwidth())
      .attr('height', (d) => this.height - y(d.value))
      .attr('fill', (d) => z(d.key));

    this.svg.append('g').attr('class', 'axis').attr('transform', 'translate(0,' + this.height + ')').call(d3.axisBottom(x0));
    this.svg.append('g').attr('class', 'y axis').call(d3.axisLeft(y).ticks(null, 's'));

    const legend = this.svg.append('g')
      .attr('font-family', 'sans-serif')
      .attr('font-size', 10)
      .attr('text-anchor', 'end')
      .selectAll('g')
      .data(this.legendsData)
      .enter()
      .append('g')
      .attr('transform', (d, i) => 'translate(0,' + i * 20 + ')');

    legend.append('rect')
      .attr('x', this.width - 17)
      .attr('width', 15)
      .attr('height', 15)
      .attr('fill', z)
      .attr('stroke', z)
      .attr('stroke-width', 2);

    legend.append('text')
      .attr('x', this.width - 24)
      .attr('y', 9.5).attr('dy', '0.32em')
      .text((d) => d);
  }

  drawStacked() {
    const x = d3.scaleBand()
      .rangeRound([0, this.width])
      .paddingInner(0.25)
      .align(0.1);

    const y = d3.scaleLinear()
      .rangeRound([this.height, 0]);

    const z = d3.scaleOrdinal()
      .range(['#33FFD1', '#338AFF']);

    const keys = this.data.columns.slice(1);

    x.domain(this.data.map((d) => d.month));

    y.domain([0, d3.max(this.data,
      (d: { month: string, deliverd: number, undelivered: number, total: number }) => +d.total)])
      .nice();

    z.domain(keys);

    this.svg.append('g')
      .selectAll('g')
      .data(d3.stack().keys(keys)(this.data))
      .enter()
      .append('g')
      .attr('fill', (d) => z(d.key))
      .selectAll('rect')
      .data((d) => d)
      .enter()
      .append('rect')
      .attr('x', (d) => x(d.data.month))
      .attr('y', (d) => y(d[1]))
      .attr('height', (d) => y(d[0]) - y(d[1]))
      .attr('width', x.bandwidth());

    this.svg.append('g')
      .attr('class', 'axis')
      .attr('transform', 'translate(0,' + this.height + ')')
      .call(d3.axisBottom(x));

    this.svg.append('g')
      .attr('class', 'axis')
      .call(d3.axisLeft(y).ticks(null, 's'));

    const legend = this.svg.append('g')
      .attr('font-family', 'sans-serif')
      .attr('font-size', 10)
      .attr('text-anchor', 'end')
      .selectAll('g')
      .data(this.legendsData)
      .enter()
      .append('g')
      .attr('transform', (d, i) => 'translate(0,' + i * 20 + ')');

    legend.append('rect')
      .attr('x', this.width - 17)
      .attr('width', 15)
      .attr('height', 15)
      .attr('fill', z)
      .attr('stroke', z)
      .attr('stroke-width', 2);

    legend.append('text')
      .attr('x', this.width - 24)
      .attr('y', 9.5)
      .attr('dy', '0.32em')
      .text((d) => d);
  }
}


