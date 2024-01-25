import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { CountryCardComponent } from './components/country-card/country-card.component';
import { CountryComponent } from './components/country/country.component';
import { CountriesService, Country } from './services/countries.service';

@Component({
  selector: 'app-countries',
  standalone: true,
  imports: [CommonModule, CountryComponent, CountryCardComponent],
  templateUrl: './countries.component.html',
})
export class CountriesComponent {
  public countries$: Observable<Country[]>;
  constructor(private countriesService: CountriesService) {
    this.countries$ = this.countriesService.countries$;
  }
}
