import { Point } from './point';
import { Component, Type, ComponentRef } from '@angular/core';

export interface WidgetProfile {
    name: string;
    unitHeight: number;
    unitWidth: number;
    offsetTopUnit: number;
    offsetLeftUnit: number;
    component: Type<any>;
    overlapped?: boolean;
    highlighted?: boolean;
}

export interface WidgetArea {
    begin: Point;
    end: Point;
}
