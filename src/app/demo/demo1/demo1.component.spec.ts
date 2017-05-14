import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Demo1Component } from './demo1.component';

describe('Demo1Component', () => {
  let component: Demo1Component;
  let fixture: ComponentFixture<Demo1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Demo1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Demo1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
