import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CampgroundDetailsComponent } from './campground-details.component';

describe('CampgroundDetailsComponent', () => {
  let component: CampgroundDetailsComponent;
  let fixture: ComponentFixture<CampgroundDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CampgroundDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CampgroundDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
