import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Demo2Component } from './demo2.component';

describe('Demo2Component', () => {
  let component: Demo2Component;
  let fixture: ComponentFixture<Demo2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Demo2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Demo2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
