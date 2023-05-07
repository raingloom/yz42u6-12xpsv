import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'leet',
})
export class LeetPipe implements PipeTransform {
  transform(value: string): string {
    return value
      .split('')
      .map(
        (x) =>
          ({
            A: '4',
            B: '8',
            E: '3',
            I: '1',
            L: '1',
            O: '0',
            T: '7',
            S: '5',
            Z: '2',
          }[x] || x)
      )
      .join('');
  }
}
