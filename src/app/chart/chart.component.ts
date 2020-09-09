import { Component, OnInit, Input } from '@angular/core';
import * as Highcharts from 'highcharts';
import { HttpClient } from '@angular/common/http';
import { CsvConverterService } from '../csv-converter.service';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {

  graphChart: any;
  mapData = [];
  dateData = Array<string>();
  deliveredData = [];
  undeliveredData = [];
  selected = 'grouped';
  constructor(private http: HttpClient, private csvService: CsvConverterService) {

    this.http.get('assets/bar-chart.csv', { responseType: 'text' })
      .subscribe(data => {
        this.mapData = this.csvService.csvLineJSON(data);
        for (const key in this.mapData) {
          if (this.mapData.hasOwnProperty(key)) {
            this.dateData.push(this.mapData[key].month);
            this.deliveredData.push(+this.mapData[key].deliverd);
            this.undeliveredData.push(+this.mapData[key].undelivered);
          }
        }
        this.generateChart(this.selected);

      });

  }

  ngOnInit() {

  }

  generateChart(selected) {
    if (selected === 'grouped') {
      Highcharts.chart('container', {
        chart: {
          type: 'column'
        },
        title: {
          text: ''
        },
        credits: {
          enabled: false
        },
        xAxis: {
          categories: this.dateData,
          crosshair: true
        },
        yAxis: {
          min: 0,
          tickInterval: 10000,
          title: {
            text: ''
          }
        },
        tooltip: {
          headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
          pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
            '<td style="padding:0"><b>{point.y}</b></td></tr>',
          footerFormat: '</table>',
          shared: true,
          useHTML: true
        },
        plotOptions: {
          column: {
            pointPadding: 0,
            borderWidth: 0
          }
        },
        series: [{
          name: 'Delivered',
          data: this.deliveredData,
          color: 'seagreen',
          type: undefined,
        }, {
          name: 'Undelivered',
          data: this.undeliveredData,
          color: 'blue',
          type: undefined,
        }]
      });
    } else {
      Highcharts.chart('container', {
        chart: {
          type: 'column'
        },
        title: {
          text: ''
        },
        credits: {
          enabled: false
        },
        xAxis: {
          categories: this.dateData,
          crosshair: true
        },
        yAxis: {
          min: 0,
          tickInterval: 10000,
          title: {
            text: ''
          },
        },
        tooltip: {
          headerFormat: '<b>{point.x}</b><br/>',
          pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}'
        },
        plotOptions: {
          column: {
            stacking: 'normal',
          }
        },
        series: [{
          name: 'Delivered',
          data: this.deliveredData,
          type: undefined,
          color: 'seagreen',
        }, {
          name: 'Undelivered',
          data: this.undeliveredData,
          type: undefined,
          color: 'blue'
        }]
      });
    }
  }

  selectChange(event) {
    this.selected = event.target.value;
    this.generateChart(this.selected);
  }
}
