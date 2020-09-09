import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CsvConverterService {

  constructor() { }

  csvLineJSON(csv) {
    const lines = csv.split('\n');
    const result = [];
    let element = '';
    let count = 0;
    const headers = [];

    // for header
    for (let x = 0; x < lines[0].length; x++) {
      if ((lines[0])[x] !== '"' && (lines[0])[x] !== ',') {
        element += (lines[0])[x];
      } else if ((lines[0])[x] === '"') {
        count++;
        if (count % 2 === 0) {
          headers.push(element);
          element = '';
        }
      }
    }

    // for individual lines
    for (let i = 1; i < lines.length; i++) {
      const obj = {};
      const currentline = [];
      for (let j = 0; j < lines[i].length; j++) {
        if ((lines[i])[j] !== '"') {
          if ((lines[i])[j] === ',' && (lines[i])[j - 1] !== '"') {
            element += (lines[i])[j];
          } else if ((lines[i])[j] !== ',') {
            element += (lines[i])[j];
          }
        } else if ((lines[i])[j] === '"') {
          count++;
          if (count % 2 === 0) {
            currentline.push(element);
            element = '';
          }
        }
      }
      for (let k = 0; k < headers.length; k++) {
        obj[headers[k]] = currentline[k];
      }
      result.push(obj);
    }
    return (result);
  }
}
