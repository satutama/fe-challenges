import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-weather',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss'],
})
export class WeatherComponent {
  public isDay = true;

  public bgURL = this.isDay
    ? "bg-[url('/assets/images/weather/day.jpg')]"
    : "bg-[url('/assets/images/weather/night.jpg')]";

  public today: number = Date.now();
}
