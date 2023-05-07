import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'prefix'
})
export class PrefixPipe implements PipeTransform {

  transform(value: string, n: number = 3): string {
    // should be a &hellip;
    return value.substring(0,n)+"…";
  }

}
