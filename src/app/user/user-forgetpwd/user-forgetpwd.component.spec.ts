import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserForgetpwdComponent } from './user-forgetpwd.component';

describe('UserForgetpwdComponent', () => {
  let component: UserForgetpwdComponent;
  let fixture: ComponentFixture<UserForgetpwdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserForgetpwdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserForgetpwdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
