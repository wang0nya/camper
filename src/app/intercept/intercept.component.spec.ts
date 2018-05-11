import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InterceptComponent } from './intercept.component';

describe('InterceptComponent', () => {
  let component: InterceptComponent;
  let fixture: ComponentFixture<InterceptComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InterceptComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InterceptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
