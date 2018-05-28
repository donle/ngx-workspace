import { WsWidgetLoaderDirective } from './ws-widget-loader.directive';
import { inject, TestBed } from '@angular/core/testing';

describe('WsWidgetLoaderDirective', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WsWidgetLoaderDirective]
    });
  });

  it('should create an instance', inject([WsWidgetLoaderDirective], (directive: WsWidgetLoaderDirective) => {
    expect(directive).toBeTruthy();
  }));
});
