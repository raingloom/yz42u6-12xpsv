import { Component, OnInit } from '@angular/core';

import { Ware } from '../ware';
import { WareService } from '../ware.service';

@Component({
  selector: 'app-warez',
  templateUrl: './warez.component.html',
  styleUrls: ['./warez.component.css'],
})
export class WarezComponent implements OnInit {
  warez: Ware[] = [];

  constructor(private wareService: WareService) {}

  ngOnInit(): void {
    this.getWarez();
  }

  getWarez(): void {
    this.wareService.getWarez().subscribe((warez) => (this.warez = warez));
  }

  add(name: string, magnet: string): void {
    name = name.trim();
    magnet = magnet.trim();
    if (!name || !magnet) {
      return;
    }
    this.wareService.addWare({ name, magnet } as Ware).subscribe((ware) => {
      this.warez.push(ware);
    });
  }

  delete(ware: Ware): void {
    this.warez = this.warees.filter((h) => h !== ware);
    this.wareService.deleteWare(ware.id).subscribe();
  }
}

/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/
