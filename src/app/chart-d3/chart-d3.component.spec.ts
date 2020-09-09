import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartD3Component } from './chart-d3.component';

describe('ChartD3Component', () => {
  let component: ChartD3Component;
  let fixture: ComponentFixture<ChartD3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartD3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartD3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
