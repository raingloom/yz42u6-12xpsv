import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Ware } from './ware';
import { MessageService } from './message.service';

@Injectable({ providedIn: 'root' })
export class WareService {
  private warezUrl = 'api/warez'; // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) {}

  /** GET warez from the server */
  getWarez(): Observable<Ware[]> {
    return this.http.get<Ware[]>(this.warezUrl).pipe(
      tap((_) => this.log('fetched warez')),
      catchError(this.handleError<Ware[]>('getWarez', []))
    );
  }

  /** GET ware by id. Return `undefined` when id not found */
  getWareNo404<Data>(id: number): Observable<Ware> {
    const url = `${this.warezUrl}/?id=${id}`;
    return this.http.get<Ware[]>(url).pipe(
      map((warez) => warez[0]), // returns a {0|1} element array
      tap((h) => {
        const outcome = h ? 'fetched' : 'did not find';
        this.log(`${outcome} ware id=${id}`);
      }),
      catchError(this.handleError<Ware>(`getWare id=${id}`))
    );
  }

  /** GET ware by id. Will 404 if id not found */
  getWare(id: number): Observable<Ware> {
    const url = `${this.warezUrl}/${id}`;
    return this.http.get<Ware>(url).pipe(
      tap((_) => this.log(`fetched ware id=${id}`)),
      catchError(this.handleError<Ware>(`getWare id=${id}`))
    );
  }

  /* GET warez whose name contains search term */
  searchWarez(term: string): Observable<Ware[]> {
    if (!term.trim()) {
      // if not search term, return empty ware array.
      return of([]);
    }
    return this.http.get<Ware[]>(`${this.warezUrl}/?name=${term}`).pipe(
      tap((x) =>
        x.length
          ? this.log(`found warez matching "${term}"`)
          : this.log(`no warez matching "${term}"`)
      ),
      catchError(this.handleError<Ware[]>('searchWarez', []))
    );
  }

  //////// Save methods //////////

  /** POST: add a new ware to the server */
  addWare(ware: Ware): Observable<Ware> {
    return this.http.post<Ware>(this.warezUrl, ware, this.httpOptions).pipe(
      tap((newWare: Ware) => this.log(`added ware w/ id=${newWare.id}`)),
      catchError(this.handleError<Ware>('addWare'))
    );
  }

  /** DELETE: delete the ware from the server */
  deleteWare(id: number): Observable<Ware> {
    const url = `${this.warezUrl}/${id}`;

    return this.http.delete<Ware>(url, this.httpOptions).pipe(
      tap((_) => this.log(`deleted ware id=${id}`)),
      catchError(this.handleError<Ware>('deleteWare'))
    );
  }

  /** PUT: update the ware on the server */
  updateWare(ware: Ware): Observable<any> {
    return this.http.put(this.warezUrl, ware, this.httpOptions).pipe(
      tap((_) => this.log(`updated ware id=${ware.id}`)),
      catchError(this.handleError<any>('updateWare'))
    );
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
