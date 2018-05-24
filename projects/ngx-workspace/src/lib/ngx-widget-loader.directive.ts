import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[wsWorkspaceLoader]'
})
export class NgxWidgetLoaderDirective {
  constructor(
    public viewContainerRef: ViewContainerRef
  ) { }
}
