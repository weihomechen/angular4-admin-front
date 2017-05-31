import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppJsplumbComponent } from './app-jsplumb.component';

describe('AppJsplumbComponent', () => {
  let component: AppJsplumbComponent;
  let fixture: ComponentFixture<AppJsplumbComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppJsplumbComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppJsplumbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
