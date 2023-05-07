import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { WareDetailComponent } from './ware-detail/ware-detail.component';
import { WarezComponent } from './warez/warez.component';
import { WareSearchComponent } from './ware-search/ware-search.component';
import { MessagesComponent } from './messages/messages.component';
import { LeetPipe } from './leet.pipe';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { PrefixPipe } from './prefix.pipe';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
  provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore())
  ],
  declarations: [
    AppComponent,
    DashboardComponent,
    WarezComponent,
    WareDetailComponent,
    MessagesComponent,
    WareSearchComponent,
    LeetPipe,
    PrefixPipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}


/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/
