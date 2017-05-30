import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppChartsComponent } from './app-charts.component';

describe('AppChartsComponent', () => {
  let component: AppChartsComponent;
  let fixture: ComponentFixture<AppChartsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppChartsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppChartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
