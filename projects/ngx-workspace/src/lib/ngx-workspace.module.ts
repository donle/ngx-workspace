import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WsDragElementComponent } from './ws-drag-element/ws-drag-element.component';
import { WsWorkboardComponent } from './ws-workboard/ws-workboard.component';
import { WsWorkspaceService } from './services/ws-workspace.service';
import { WsWidgetDraggableDirective } from './directives/ws-workspace-draggable.directive';
import { WsWorkspaceDataService } from './services/ws-workspace-data.service';
import { WsWidgetLoaderDirective } from './directives/ws-widget-loader.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    WsDragElementComponent,
    WsWorkboardComponent,
    WsWidgetDraggableDirective,
    WsWidgetLoaderDirective
  ],
  providers: [
    WsWorkspaceService,
    WsWorkspaceDataService
  ],
  exports: [
    WsWorkboardComponent,
    WsDragElementComponent
  ]
})
export class NgxWorkspaceModule { }
