import { Observable } from "rxjs";
import { Cell } from "./Cell";
import { Table } from "./Table";

type HeaderProps = {
  fizz: number | undefined;
  buzz: number | undefined;
  countDown: number;
};

export class Header {
  public static readonly HEIGHT = 4;

  public constructor(props$: Observable<HeaderProps>) {
    props$.subscribe((newProps) => this.render(newProps));
  }

  private format(props: HeaderProps) {
    const { fizz, buzz, countDown } = props;
    return [
      `Let's play FIZZ BUZZ                                  `,
      `FIZZ = ${fizz || "TBD"}                                        `,
      `BUZZ = ${buzz || "TBD"}         updating in: ${countDown}      `,
      "".padStart(Table.CELLS_PER_ROW * Cell.WIDTH, "-"),
    ];
  }

  private render(props: HeaderProps) {
    const lines = this.format(props);
    lines.forEach((line, index) => {
      process.stdout.cursorTo(0, index);
      process.stdout.write(line);
    });
  }
}
