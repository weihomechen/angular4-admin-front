import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppCkeditorComponent } from './app-ckeditor.component';

describe('AppCkeditorComponent', () => {
  let component: AppCkeditorComponent;
  let fixture: ComponentFixture<AppCkeditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppCkeditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppCkeditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
