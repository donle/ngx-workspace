import { BrowserModule } from '@angular/platform-browser';
import { NoopAnimationsModule, BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgModule } from '@angular/core';
import {
  MatButtonModule,
  MatCheckboxModule,
  MatRadioModule,
  MatSlideToggleModule,
  MatInputModule,
  MatFormFieldModule
} from '@angular/material';
// import { NgxWorkspaceModule } from 'ngx-workspace';
import { NgxWorkspaceModule } from '../../../dist/ngx-workspace';

import { AppComponent } from './app.component';
import { WidgetAComponent } from './widget-a/widget-a.component';
import { WidgetBComponent } from './widget-b/widget-b.component';
import { WidgetCComponent } from './widget-c/widget-c.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    WidgetAComponent,
    WidgetBComponent,
    WidgetCComponent
  ],
  imports: [
    BrowserModule,
    NoopAnimationsModule,
    BrowserAnimationsModule,
    FormsModule,
    NgxWorkspaceModule,
    MatButtonModule,
    MatCheckboxModule,
    MatRadioModule,
    MatSlideToggleModule,
    MatInputModule,
    MatFormFieldModule
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
