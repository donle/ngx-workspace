import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxDragElementComponent } from './ngx-drag-element.component';

describe('NgxDragElementComponent', () => {
  let component: NgxDragElementComponent;
  let fixture: ComponentFixture<NgxDragElementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgxDragElementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxDragElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
