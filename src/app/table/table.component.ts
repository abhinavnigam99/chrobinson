import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { CsvConverterService } from '../csv-converter.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnDestroy, OnInit {
  dtOptions: DataTables.Settings = {};
  mapData: any;
  dtTrigger = new Subject();
  sumDelivered = 0;
  sumUndelivered = 0;

  constructor(private http: HttpClient, private csvService: CsvConverterService) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      lengthMenu: [[3, 5, 10, -1], [3, 5, 10, 'All']],
      pageLength: 5
    };
    this.http.get('assets/bar-chart.csv', { responseType: 'text' })
      .subscribe(data => {
        this.mapData = this.csvService.csvLineJSON(data);
        this.sumDelivered = this.mapData.reduce((sum, obj) => sum + parseFloat(obj.deliverd || 0), 0);
        this.sumUndelivered = this.mapData.reduce((sum, obj) => sum + parseFloat(obj.undelivered || 0), 0);
        this.dtTrigger.next();
      });
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
}
