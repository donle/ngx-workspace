import { Point } from './point';

export interface TileProfile {
    name: string;
    unitHeight: number;
    unitWidth: number;
    offsetTopUnit: number;
    offsetLeftUnit: number;
    overlapped?: boolean;
    highlighted?: boolean;
}

export interface TileArea {
    begin: Point;
    end: Point;
}
