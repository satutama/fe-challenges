import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private apiKey = '5acff7859a5c4c119b3194755240804';
  private url = `http://api.weatherapi.com/v1/current.json?key=${this.apiKey}`;
  public weatherData: Observable<any>;

  constructor() {
    this.weatherData = this.getWeather();
  }

  private getWeather(): Observable<any> {
    return of();
  }
}
