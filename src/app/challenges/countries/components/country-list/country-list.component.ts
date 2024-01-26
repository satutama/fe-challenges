import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Observable, combineLatest, debounceTime, map, startWith } from 'rxjs';
import { Country, Regions } from '../../country';
import { CountriesService } from '../../services/countries.service';
import { CountryCardComponent } from '../country-card/country-card.component';

@Component({
  selector: 'app-country-list',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, CountryCardComponent],
  templateUrl: './country-list.component.html',
  styleUrls: ['./country-list.component.scss'],
})
export class CountryListComponent {
  public filteredCountries$!: Observable<Country[]>;
  public regions = Regions;

  public name = new FormControl('');
  public region = new FormControl('');

  constructor(private countriesService: CountriesService) {}

  ngOnInit(): void {
    this.filteredCountries$ = this.filterListener();
  }

  private filterListener(): Observable<Country[]> {
    return combineLatest([
      this.countriesService.countries$,
      this.name.valueChanges.pipe(debounceTime(200), startWith('')),
      this.region.valueChanges.pipe(startWith('')),
    ]).pipe(
      map(([countries, countryName, region]) => {
        return countries
          .filter((country: Country) => {
            const nameMatches =
              !countryName ||
              country.name.common
                .toLocaleLowerCase()
                .includes(countryName.toLowerCase());

            const regionMatches =
              !region ||
              country.region.toLocaleLowerCase().includes(region.toLowerCase());

            return nameMatches && regionMatches;
          })
          .sort((a, b) => (a.name.common < b.name.common ? -1 : 1));
      })
    );
  }
}
