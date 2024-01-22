import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  Observable,
  Subject,
  catchError,
  merge,
  share,
  switchMap,
  throwError,
} from 'rxjs';

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
  private domainSubject = new Subject<string>();
  private apiKey = 'at_W59ackEMWkfq16RP8nPkOYFD2cTj6';
  private url = `https://geo.ipify.org/api/v2/country,city?apiKey=${this.apiKey}`;

  constructor(private http: HttpClient) {
    const initialIpDetails$ = this.getIPDetails(this.url);
    const searchedIpDetails$ = this.domainSubject
      .asObservable()
      .pipe(switchMap((domain) => this.getIPDetails(domain)));

    this.IPDetails$ = merge(initialIpDetails$, searchedIpDetails$).pipe(
      share()
    );
  }

  public selectDomain(domain?: string) {
    const url = domain ? `${this.url}&domain=${domain}` : this.url;
    this.domainSubject.next(url);
  }

  private getIPDetails(url: string) {
    return this.http
      .get<IPResponse>(`${url}`)
      .pipe(catchError((error) => throwError(() => error)));
  }
}
