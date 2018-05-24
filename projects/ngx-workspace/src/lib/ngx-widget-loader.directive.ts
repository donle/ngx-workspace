import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[ngx-workspace-loader]'
})
export class NgxWidgetLoaderDirective {
  constructor(
    public viewContainerRef: ViewContainerRef
  ) { }
}
