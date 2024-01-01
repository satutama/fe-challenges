import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';

export interface IPResponse {
  ip: string;
  location: {
    country: string;
    region: string;
    city: string;
    lat: number;
    lng: number;
    postalCode: string;
    timezone: string;
    geonameId: 5375481;
  };
  domains: string[];
  as: {
    asn: 15169;
    name: string;
    route: string;
    domain: string;
    type: string;
  };
  isp: string;
}

@Injectable({
  providedIn: 'root',
})
export class IPAddressTrackerService {
  private url = 'https://geo.ipify.org/api/v2/country,city';

  constructor(private http: HttpClient) {}

  public getIPDetails(): Observable<IPResponse[]> {
    return this.http
      .get<IPResponse[]>(`${this.url}/posts`)
      .pipe(catchError((error) => throwError(() => error)));
  }
}
