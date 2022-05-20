export const fizzBuzz = (fizz: number, buzz: number, num: number) => {
  if (num % fizz === 0 && num % buzz === 0) {
    return "FIZZ-BUZZ";
  }

  if (num % fizz === 0) {
    return "FIZZ";
  }

  if (num % buzz === 0) {
    return "BUZZ";
  }

  return `${num}`;
};
