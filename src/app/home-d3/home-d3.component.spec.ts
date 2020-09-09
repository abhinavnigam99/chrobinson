import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeD3Component } from './home-d3.component';

describe('HomeD3Component', () => {
  let component: HomeD3Component;
  let fixture: ComponentFixture<HomeD3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeD3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeD3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
