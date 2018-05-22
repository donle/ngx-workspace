import { DraggableDirective } from './ngx-workspace-draggable.directive';
import { ElementRef, Renderer } from '@angular/core';
import { inject, TestBed } from '@angular/core/testing';

describe('DraggableDirective', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DraggableDirective]
    });
  });

  it('should create an instance', inject([DraggableDirective], (directive: DraggableDirective) => {
    expect(directive).toBeTruthy();
  }));
});
