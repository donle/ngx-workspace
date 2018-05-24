import { WsWidgetDraggableDirective } from './ngx-workspace-draggable.directive';
import { inject, TestBed } from '@angular/core/testing';

describe('WsWidgetDraggableDirective', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WsWidgetDraggableDirective]
    });
  });

  it('should create an instance', inject([WsWidgetDraggableDirective], (directive: WsWidgetDraggableDirective) => {
    expect(directive).toBeTruthy();
  }));
});
