import { Directive, ElementRef, ViewContainerRef, Input } from '@angular/core';

@Directive({
  selector: '[ngx-workspace-loader]'
})
export class NgxWidgetLoaderDirective {
  constructor(
    public viewContainerRef: ViewContainerRef,
    private elementRef: ElementRef
  ) { }
}
