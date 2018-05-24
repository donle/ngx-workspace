import { Component, EventEmitter } from '@angular/core';
import { WidgetProfile } from 'ngx-workspace';
import { WidgetAComponent } from './widget-a/widget-a.component';
import { WidgetBComponent } from './widget-b/widget-b.component';
import { WidgetCComponent } from './widget-c/widget-c.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public originalWidgets: Array<WidgetProfile> = [
    {
      name: 'widget-a',
      unitHeight: 1,
      unitWidth: 2,
      offsetLeftUnit: 0,
      offsetTopUnit: 1,
      component: WidgetAComponent
    },
    {
      name: 'widget-b',
      unitHeight: 2,
      unitWidth: 1,
      offsetLeftUnit: 2,
      offsetTopUnit: 0,
      component: WidgetBComponent
    },
    {
      name: 'widget-c',
      unitHeight: 3,
      unitWidth: 4,
      offsetLeftUnit: 0,
      offsetTopUnit: 2,
      component: WidgetCComponent
    },
  ];
  public editable: boolean = false;
  public responsiveScale: number = 768;
  public responsive: boolean = true;
  public displayWidgets: WidgetProfile[];

  public widgetsControl = [
    {
      name: 'widget-a',
      Title: 'Widget A',
      enabled: true
    },
    {
      name: 'widget-b',
      Title: 'Widget B',
      enabled: true
    },
    {
      name: 'widget-c',
      Title: 'Widget C',
      enabled: true
    },
  ];

  constructor() {
    this.checkWidgetsStatus();
  }

  private checkWidgetsStatus () {
    this.displayWidgets = [];
    for (let widget of this.widgetsControl) {
      if (widget.enabled) {
        let result = this.originalWidgets.find(w => w.name === widget.name);
        this.displayWidgets.push(result);
      }
    }
  }

  public checkWidget () {
    this.checkWidgetsStatus();
  }
}
