import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WidgetCComponent } from './widget-c.component';

describe('WidgetCComponent', () => {
  let component: WidgetCComponent;
  let fixture: ComponentFixture<WidgetCComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WidgetCComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WidgetCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
