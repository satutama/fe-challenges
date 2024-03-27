import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Observable, interval, map, startWith } from 'rxjs';

const MINUTE_IN_MILIS = 60000;
@Component({
  selector: 'app-weather',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './weather.component.html',
})
export class WeatherComponent {
  public isDay = true;

  public bgURL = this.isDay
    ? "bg-[url('/assets/images/weather/day.jpg')]"
    : "bg-[url('/assets/images/weather/night.jpg')]";

  public today: Observable<number> = interval(MINUTE_IN_MILIS).pipe(
    startWith(0),
    map(() => Date.now())
  );
}
