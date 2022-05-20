import { interval, map, merge, Observable, scan, Subject } from "rxjs";
import { Header } from "./Header";
import { Table } from "./Table";

const timer$ = interval(1000); // 1 2 3 4

console.clear();

const COUNT_DOWN_DURATION = 11;
const countDown$ = new Observable<number>((subscriber) =>
  timer$.subscribe(
    (count) =>
      subscriber.next(COUNT_DOWN_DURATION - 1 - (count % COUNT_DOWN_DURATION)) // 10 9 8 7 ... 0 10
  )
);
const rand3to13 = () => Math.floor(Math.random() * 11 + 2.99999);
const newFizz$ = new Observable<number>((subscriber) => {
  subscriber.next(rand3to13());
  countDown$.subscribe((countDown) => {
    if (countDown === 2) {
      subscriber.next(rand3to13());
    }
  });
});

const fizz$ = new Subject<number>();
newFizz$.subscribe(fizz$);

const newBuzz$ = new Observable<number>((subscriber) => {
  subscriber.next(rand3to13());
  countDown$.subscribe((countDown) => {
    if (countDown === 0) {
      subscriber.next(rand3to13());
    }
  });
});

const buzz$ = new Subject<number>();
newBuzz$.subscribe(buzz$);

const fizzBuzz$ = merge(
  fizz$.pipe(map((fizz) => ({ fizz }))),
  buzz$.pipe(map((buzz) => ({ buzz })))
).pipe(
  scan((acc, update) => ({ ...acc, ...update }), {
    fizz: 0,
    buzz: 0,
  })
);

const headerProps$ = merge(
  fizzBuzz$,
  countDown$.pipe(map((countDown) => ({ countDown })))
).pipe(
  scan((acc, update) => ({ ...acc, ...update }), {
    fizz: undefined,
    buzz: undefined,
    countDown: 0,
  } as {
    fizz: number | undefined;
    buzz: number | undefined;
    countDown: number;
  })
);

new Header(headerProps$);
new Table(fizzBuzz$, 100);
