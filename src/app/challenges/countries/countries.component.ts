import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CountryCardComponent } from './components/country-card/country-card.component';
import { CountryComponent } from './components/country/country.component';

@Component({
  selector: 'app-countries',
  standalone: true,
  imports: [CommonModule, CountryComponent, CountryCardComponent],
  templateUrl: './countries.component.html',
})
export class CountriesComponent {}
