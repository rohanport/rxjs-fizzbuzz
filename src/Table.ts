import { Observable } from "rxjs";
import { Cell } from "./Cell";
import { Header } from "./Header";

type TableProps = {
  fizz: number;
  buzz: number;
};

export class Table {
  public static readonly CELLS_PER_ROW = 10;

  public readonly cells: Cell[];

  constructor(props$: Observable<TableProps>, size: number) {
    this.cells = new Array(size)
      .fill(0)
      .map((_, index) => new Cell(props$, this.cellPosition(index), index + 1));
  }

  private cellPosition(index: number) {
    return [
      (index % Table.CELLS_PER_ROW) * Cell.WIDTH,
      Math.floor(index / Table.CELLS_PER_ROW) * Cell.HEIGHT + Header.HEIGHT,
    ] as [number, number];
  }
}
