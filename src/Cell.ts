import { Observable } from "rxjs";
import { fizzBuzz } from "./fizzBuzz";

type CellProps = {
  fizz: number;
  buzz: number;
};

export class Cell {
  public static readonly WIDTH = 11;
  public static readonly HEIGHT = 2;

  private readonly position: [number, number];

  constructor(
    props$: Observable<CellProps>,
    position: [number, number],
    value: number
  ) {
    this.position = position;
    props$.subscribe(({ fizz, buzz }) =>
      this.render(fizzBuzz(fizz, buzz, value))
    );
  }

  private formatValue(value: string) {
    let middleLine = value;
    let padCount = 0;
    while (middleLine.length < Cell.WIDTH) {
      if (padCount % 2 === 0) {
        middleLine = middleLine.padStart(middleLine.length + 1, " ");
      } else {
        middleLine = middleLine.padEnd(middleLine.length + 1, " ");
      }
      padCount++;
    }

    let lines = [middleLine];
    const spaceLine = "".padStart(Cell.WIDTH, " ");
    let spaceCount = 0;
    while (lines.length < Cell.HEIGHT) {
      if (spaceCount % 2 === 0) {
        lines = [spaceLine, ...lines];
      } else {
        lines = [...lines, spaceLine];
      }
      spaceCount++;
    }

    return lines;
  }

  private render(fizzBuzzResult: string) {
    const [x, y] = this.position;

    const lines = this.formatValue(fizzBuzzResult);

    lines.forEach((line, index) => {
      process.stdout.cursorTo(x, y + index);
      process.stdout.write(line);
    });
  }
}
