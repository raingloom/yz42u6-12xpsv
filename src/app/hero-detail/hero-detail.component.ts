import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Ware } from '../ware';
import { WareService } from '../ware.service';

@Component({
  selector: 'app-ware-detail',
  templateUrl: './ware-detail.component.html',
  styleUrls: [ './ware-detail.component.css' ]
})
export class WareDetailComponent implements OnInit {
  ware: Ware | undefined;

  constructor(
    private route: ActivatedRoute,
    private wareService: WareService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getWare();
  }

  getWare(): void {
    const id = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
    this.wareService.getWare(id)
      .subscribe(ware => this.ware = ware);
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    if (this.ware) {
      this.wareService.updateWare(this.ware)
        .subscribe(() => this.goBack());
    }
  }
}


/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/