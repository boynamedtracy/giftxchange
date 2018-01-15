import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FacebookLoginResponseComponent } from './facebook-login-response.component';

describe('FacebookLoginResponseComponent', () => {
  let component: FacebookLoginResponseComponent;
  let fixture: ComponentFixture<FacebookLoginResponseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FacebookLoginResponseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FacebookLoginResponseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
