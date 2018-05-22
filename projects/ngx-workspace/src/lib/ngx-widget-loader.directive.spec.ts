import { NgxWidgetLoaderDirective } from './ngx-widget-loader.directive';
import { inject, TestBed } from '@angular/core/testing';

describe('NgxWidgetLoaderDirective', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NgxWidgetLoaderDirective]
    });
  });

  it('should create an instance', inject([NgxWidgetLoaderDirective], (directive: NgxWidgetLoaderDirective) => {
    expect(directive).toBeTruthy();
  }));
});
