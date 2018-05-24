import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WidgetBComponent } from './widget-b.component';

describe('WidgetBComponent', () => {
  let component: WidgetBComponent;
  let fixture: ComponentFixture<WidgetBComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WidgetBComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WidgetBComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
