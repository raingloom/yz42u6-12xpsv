import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Ware } from './ware';
import { WAREZ } from './mock-warez';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const warez = WAREZ;
    return { warez };
  }

  // Overrides the genId method to ensure that a ware always has an id.
  // If the warez array is empty,
  // the method below returns the initial number (11).
  // if the warez array is not empty, the method below returns the highest
  // ware id + 1.
  genId(warez: Ware[]): number {
    return warez.length > 0
      ? Math.max(...warez.map((ware) => ware.id)) + 1
      : 11;
  }
}
