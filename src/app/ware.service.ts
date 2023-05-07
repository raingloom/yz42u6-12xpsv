import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Firestore, collection, collectionData, addDoc, CollectionReference, collectionChanges, doc, getDoc, getDocs, updateDoc, deleteDoc } from '@angular/fire/firestore';

import { Observable, of, from } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Ware, fromSnapshot } from './ware';
import { MessageService } from './message.service';

@Injectable({ providedIn: 'root' })
export class WareService {
  private warezUrl = 'api/warez'; // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService,
    private firestore: Firestore
  ) {}

  warezCollection() {
    return collection(this.firestore, 'warez') as CollectionReference<Ware>;
  }

  warezData(): Observable<Ware[]> {
    return from(getDocs(this.warezCollection())
      .then(snaps=>
        snaps.docs.map(fromSnapshot)));
  }

  /** GET warez from the server */
  getWarez(): Observable<Ware[]> {
    return this.warezData().pipe(
      tap((_) => this.log('fetched warez')),
      catchError(this.handleError<Ware[]>('getWarez', []))
    );
  }

  getWare(id: string): Observable<Ware> {
    const wareRef = doc<Ware>(this.warezCollection(), id);
    const ware = getDoc(wareRef).then(fromSnapshot);
    return from(ware);
  }

  /* GET warez whose name contains search term */
  searchWarez(term: string): Observable<Ware[]> {
    term = term.toLowerCase()
    if (!term.trim()) {
      // if not search term, return empty ware array.
      return of([]);
    }
    return this.getWarez()
      .pipe(
        map(warez=>warez.filter(ware=>ware.name.toLowerCase().includes(term))))
      .pipe(
        tap((x) =>
          x.length
            ? this.log(`found warez matching "${term}"`)
            : this.log(`no warez matching "${term}"`)
        )
    );
  }

  //////// Save methods //////////

  /** POST: add a new ware to the server */
  addWare(ware: Ware) {
    return from(addDoc<Ware>(this.warezCollection(), ware).then(_=>ware));
  }

  /** DELETE: delete the ware from the server */
  deleteWare(id: string): Promise<void> {
    const ref = doc<Ware>(this.warezCollection(), id);
    return deleteDoc(ref);
  }

  /** PUT: update the ware on the server */
  updateWare(ware: Ware): Promise<void> {
    const ref = doc<Ware>(this.warezCollection(), ware.id);
    return updateDoc(ref, {name: ware.name, description: ware.description, magnet: ware.magnet});
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   *
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a WareService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`WareService: ${message}`);
  }
}
