import { Component, OnInit } from '@angular/core';
import { Ware } from '../ware';
import { WareService } from '../ware.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})
export class DashboardComponent implements OnInit {
  warez: Ware[] = [];

  constructor(private wareService: WareService) { }

  ngOnInit(): void {
    this.getWarez();
  }

  getWarez(): void {
    this.wareService.getWarez()
      .subscribe(warez => this.warez = warez.slice(1, 5));
  }
}


/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/