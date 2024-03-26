import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-weather',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss'],
})
export class WeatherComponent {
  public isDay = true;

  public bgURL = this.isDay
    ? "bg-[url('/assets/images/weather/day.jpg')]"
    : "bg-[url('/assets/images/weather/night.jpg')]";
}
