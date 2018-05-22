import { Injectable } from '@angular/core';
import { TileProfile, TileArea } from './interfaces/tile';
@Injectable()
export class NgxWorkspaceService {
  private tiles: Array<TileProfile>;
  constructor() {
    this.tiles = [];
  }

  private initTileOptions (tile: TileProfile) {
    if (tile.overlapped === undefined) tile.overlapped = false;
    if (tile.highlighted === undefined) tile.highlighted = false;
  }

  public get Tiles() {
    return this.tiles;
  }

  public add(tile: TileProfile) {
    this.initTileOptions(tile);
    this.tiles.push(tile);
  }

  public remove(tile: TileProfile) {
    let index = this.tiles.findIndex(_tile => tile.name === _tile.name);
    if (index >= 0) this.tiles.splice(index, 1);
  }

  public tilesOverlappedWithOthers(tiles?: Array<TileProfile>) {
    tiles = tiles || this.tiles;
    let occupiedTiles: Array<number> = [];

    for (let i = 0; i < tiles.length; i++) {
      const src_tile = tiles[i];
      for (let j = i + 1; j < tiles.length; j++) {
        const dest_tile = tiles[j];
        const srcTileArea: TileArea = {
          begin: {
            X: src_tile.offsetLeftUnit,
            Y: src_tile.offsetTopUnit
          },
          end: {
            X: src_tile.offsetLeftUnit + src_tile.unitWidth,
            Y: src_tile.offsetTopUnit + src_tile.unitHeight
          }
        };
        let destTileArea: TileArea = {
          begin: {
            X: dest_tile.offsetLeftUnit,
            Y: dest_tile.offsetTopUnit
          },
          end: {
            X: dest_tile.offsetLeftUnit + dest_tile.unitWidth,
            Y: dest_tile.offsetTopUnit + dest_tile.unitHeight
          }
        };
        if (this.isInsideAreaOf(destTileArea, srcTileArea)) {
          if (!occupiedTiles.includes(i)) occupiedTiles.push(i);
          occupiedTiles.push(j);
        }
      }
    }
    return occupiedTiles;
  }

  private isInsideAreaOf(origin: TileArea, target: TileArea): boolean {
    return target.end.X > origin.begin.X && target.begin.X < origin.end.X && target.end.Y > origin.begin.Y && target.begin.Y < origin.end.Y;
  }

  public isShadowCoveredOnTiles(tilename: string, area: TileArea): boolean {
    for (let tile of this.tiles) {
      if (tile.name === tilename) continue;
      const srcTileArea: TileArea = {
        begin: {
          X: tile.offsetLeftUnit,
          Y: tile.offsetTopUnit
        },
        end: {
          X: tile.offsetLeftUnit + tile.unitWidth,
          Y: tile.offsetTopUnit + tile.unitHeight
        }
      };

      if (this.isInsideAreaOf(srcTileArea, area)) return true;
    }
    return false;
  }
}
