import { CommonModule } from '@angular/common';
import { Component, HostBinding, OnInit, effect, signal } from '@angular/core';
import { FormControl } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Observable, combineLatest, debounceTime, map, startWith } from 'rxjs';
import { Country, Regions } from './country';
import { CountriesService } from './services/countries.service';

@Component({
  selector: 'app-countries',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './countries.component.html',
})
export class CountriesComponent implements OnInit {
  public darkMode = signal<boolean>(
    JSON.parse(window.localStorage.getItem('darkMode') ?? 'false')
  );
  public filteredCountries$!: Observable<Country[]>;
  public regions = Regions;

  public name = new FormControl('');
  public region = new FormControl('');

  @HostBinding('class.dark') get mode() {
    return this.darkMode();
  }

  constructor(private countriesService: CountriesService) {
    effect(() => {
      window.localStorage.setItem('darkMode', JSON.stringify(this.darkMode()));
    });
  }

  ngOnInit(): void {
    this.filteredCountries$ = this.filterListener();
  }

  public changeMode() {
    this.darkMode.set(!this.darkMode());
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
