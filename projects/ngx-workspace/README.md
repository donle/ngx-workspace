# ngx-workspace

Workspace is a whiteboard for users to customise the location of each widget/application on the page, it follows the rules of 12 grid net design. The whiteboard has been split up to 12 squares in a row, the widgets/applications initialise a normalised size to draw them on the whiteboard. All the widgets/applications on the board is draggable, and they all align to the grid net.

# Demo 

[Here](https://donle.github.io/ngx-workspace/)

# How to use

In app module, import `NgxWorkspaceModule` into the project. Components imported into workspace should be declared in `entryComponents`.
#### app.module.ts
```typescript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgxWorkspaceModule } from 'ngx-workspace';

import { AppComponent } from './app.component';
import { WidgetAComponent } from './widget-a/widget-a.component';
import { WidgetBComponent } from './widget-b/widget-b.component';
import { WidgetCComponent } from './widget-c/widget-c.component';

@NgModule({
  declarations: [
    AppComponent,
    WidgetAComponent,
    WidgetBComponent,
    WidgetCComponent
  ],
  imports: [
    BrowserModule
    NgxWorkspaceModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [
    WidgetAComponent,
    WidgetBComponent,
    WidgetCComponent
  ]
})
export class AppModule { }

```

##### app.component.html
```html
<ws-workboard [wsWidgets]="widgets" [wsResponsive]="responsive" [wsResponsiveScale]="responsiveScale" [wsEditable]="editable"></ws-workboard>
```

##### app.component.ts
```typescript
import { Component } from '@angular/core';
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
  public widgets: Array<WidgetProfile> = [
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
  public editable = false;
  public responsiveScale = 768;
  public responsive = true;
}
```

You can try it in [demo page](https://donle.github.io/ngx-workspace/)

# Documentation


  ##### input of ```ngx-workboard```
  
|    parameter    | optional | type | description |
| ----------------- | -------- | ---- | ----------- |
| wsWidgets |  required | WidgetProfile[] | Import draggable components into workspace | 
| wsResponsive |  optional(default: true) | boolean | Enable responsive mode of workspace |
| wsResponsiveScale | optional (default: 0) | number | Disable responsive mode when screen width is less than 'wsResponsiveScale' |
| wsEditable | required (default: true) | boolean | Enable/disable workspace edit mode |

 ##### WidgetProfile
 
|    parameter    | optional | type | description |
| ----------------- | -------- | ---- | ----------- |
| name | required | string | Component name, must be unique |
| unitHeight | required | number | Component unit height, from 1 to 12 |
| unitWidth | required | number | Component unit width, from 1 to 12 |
| offsetHeight | required | number | Component position offset unit of height, from 1 to 12 |
| unitWidth | required | number | Component position offset unit of width, from 1 to 12 |
| component | required | Angular Component | Component loaded in the widget |
