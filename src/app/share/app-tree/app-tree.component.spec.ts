import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppTreeComponent } from './app-tree.component';

describe('AppTreeComponent', () => {
  let component: AppTreeComponent;
  let fixture: ComponentFixture<AppTreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppTreeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
