import { NgxWidgetDraggableDirective } from './ngx-workspace-draggable.directive';
import { inject, TestBed } from '@angular/core/testing';

describe('NgxWidgetDraggableDirective', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NgxWidgetDraggableDirective]
    });
  });

  it('should create an instance', inject([NgxWidgetDraggableDirective], (directive: NgxWidgetDraggableDirective) => {
    expect(directive).toBeTruthy();
  }));
});
