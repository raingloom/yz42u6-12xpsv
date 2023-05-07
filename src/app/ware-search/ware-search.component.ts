import { Component, OnInit } from '@angular/core';

import { Observable, Subject } from 'rxjs';

import {
   debounceTime, distinctUntilChanged, switchMap
 } from 'rxjs/operators';

import { Ware } from '../ware';
import { WareService } from '../ware.service';

@Component({
  selector: 'app-ware-search',
  templateUrl: './ware-search.component.html',
  styleUrls: [ './ware-search.component.css' ]
})
export class WareSearchComponent implements OnInit {
  warez$!: Observable<Ware[]>;
  private searchTerms = new Subject<string>();

  constructor(private wareService: WareService) {}

  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.warez$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.wareService.searchWarez(term)),
    );
  }
}


/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/