import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TwitterLoginResponseComponent } from './twitter-login-response.component';

describe('TwitterLoginResponseComponent', () => {
  let component: TwitterLoginResponseComponent;
  let fixture: ComponentFixture<TwitterLoginResponseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TwitterLoginResponseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TwitterLoginResponseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
