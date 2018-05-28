import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[wsWorkspaceLoader]'
})
export class WsWidgetLoaderDirective {
  constructor(
    public viewContainerRef: ViewContainerRef
  ) { }
}
