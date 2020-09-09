import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';

import { HttpClient } from '@angular/common/http';
import { CsvConverterService } from '../csv-converter.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-drilldown',
  templateUrl: './drilldown.component.html',
  styleUrls: ['./drilldown.component.css']
})
export class DrilldownComponent implements OnInit {
  mapData = [];
  currentSpend = [];
  previousSpend = [];
  monthData = [];
  currentShipment = [];
  previousShipment = [];
  currentHoverData = [];
  previousHoverData = [];

  constructor(private http: HttpClient, private csvService: CsvConverterService) {

    this.http.get('assets/line-bar-chart.csv', { responseType: 'text' })
      .subscribe(data => {
        this.mapData = this.csvService.csvLineJSON(data);
        for (const key in this.mapData) {
          if (this.mapData.hasOwnProperty(key)) {
            this.monthData.push(this.mapData[key].values__label);
            this.currentSpend.push(+this.mapData[key].values__amount);
            this.currentShipment.push(+this.mapData[key].values__shipmentCount);
            this.currentHoverData.push(+this.mapData[key].values__mouseOverText);
          }
        }
        this.previousSpend = this.currentSpend.splice(7);
        this.monthData = this.monthData.splice(7);
        this.previousShipment = this.currentShipment.splice(7);
        this.previousHoverData = this.currentHoverData.splice(7);
        this.generateChart();
      });
  }

  ngOnInit() {

  }

  generateChart() {
    Highcharts.chart('container', {
      chart: {
        zoomType: 'xy'
      },
      title: {
        text: ''
      },
      credits: {
        enabled: false
      },
      plotOptions: {
        column: {
          pointPadding: 0,
        }
      },
      xAxis: [{
        categories: this.monthData,
        crosshair: true
      }],
      yAxis: [{
        labels: {
          format: '${value}',
          style: {
            color: Highcharts.getOptions().colors[1]
          }
        },
        title: {
          text: 'Spend($)',
          style: {
            color: Highcharts.getOptions().colors[1]
          }
        }
      }, {
        title: {
          text: 'Shipment',
          style: {
            color: Highcharts.getOptions().colors[0]
          }
        },
        labels: {
          format: '{value}',
          style: {
            color: Highcharts.getOptions().colors[0]
          }
        },
        opposite: true
      }],
      tooltip: {
        shared: false,
      },
      series: [{
        name: 'Shippment Current',
        type: 'column',
        yAxis: 1,
        data: this.currentShipment,
        tooltip: {
          valueSuffix: ''
        },
        color: 'lightblue'
      }, {
        name: 'Shippment Previous',
        type: 'column',
        yAxis: 1,
        data: this.previousShipment,
        tooltip: {
          valueSuffix: ''
        },
        borderColor: 'lightblue',
        borderWidth: 1,
        color: 'transparent',
        dashStyle: 'Dash'
      }, {
        name: 'Spend Current',
        type: 'spline',
        data: this.currentSpend,
        tooltip: {
          valueSuffix: '$',
          valueDecimals: 2,
        },
        color: 'lightblue'
      }, {
        name: 'Spend previous',
        type: 'spline',
        data: this.previousSpend,
        tooltip: {
          valueSuffix: '$',
          valueDecimals: 2,
        },
        dashStyle: 'Dash',
        color: 'lightblue'
      }]
    });
  }

}
