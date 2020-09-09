import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DrilldownD3Component } from './drilldown-d3.component';

describe('DrilldownD3Component', () => {
  let component: DrilldownD3Component;
  let fixture: ComponentFixture<DrilldownD3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DrilldownD3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DrilldownD3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
