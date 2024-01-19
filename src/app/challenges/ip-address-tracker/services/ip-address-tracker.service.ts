import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, catchError, throwError } from 'rxjs';

export interface IPResponse {
  as: {
    asn: number;
    name: string;
    route: string;
    domain: string;
    type: string;
  };
  ip: string;
  isp: string;
  location: {
    country: string;
    region: string;
    city: string;
    lat: number;
    lng: number;
    postalCode: string;
    timezone: string;
    geonameId: number;
  };
}

@Injectable({
  providedIn: 'root',
})
export class IPAddressTrackerService {
  public IPDetails$: Observable<IPResponse>;
  private IPDetailsSubject = new Subject<IPResponse>();
  private apiKey = 'at_W59ackEMWkfq16RP8nPkOYFD2cTj6';
  private url = `https://geo.ipify.org/api/v2/country,city?apiKey=${this.apiKey}`;

  constructor(private http: HttpClient) {
    this.IPDetails$ = this.IPDetailsSubject.asObservable();
  }

  public getLocalIp() {
    return this.http
      .get<IPResponse>(`${this.url}`)
      .pipe(catchError((error) => throwError(() => error)));
  }

  public getIPDetails(domain: string) {
    return this.http
      .get<IPResponse>(`${this.url}&domain=${domain}`)
      .pipe(catchError((error) => throwError(() => error)))
      .subscribe((response) => this.IPDetailsSubject.next(response));
  }
}