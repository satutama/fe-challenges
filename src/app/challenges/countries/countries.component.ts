import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CountryComponent } from './country/country.component';

@Component({
  selector: 'app-countries',
  standalone: true,
  imports: [CommonModule, CountryComponent],
  templateUrl: './countries.component.html',
})
export class CountriesComponent {}
