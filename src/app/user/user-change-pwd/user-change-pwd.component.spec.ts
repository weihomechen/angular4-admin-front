import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserChangePwdComponent } from './user-change-pwd.component';

describe('UserChangePwdComponent', () => {
  let component: UserChangePwdComponent;
  let fixture: ComponentFixture<UserChangePwdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserChangePwdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserChangePwdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
