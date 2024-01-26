import { Routes } from '@angular/router';
import { CountryListComponent } from './components/country-list/country-list.component';
import { CountryComponent } from './components/country/country.component';
import { CountriesComponent } from './countries.component';

export const COUNTRIES_ROUTES: Routes = [
  {
    path: '',
    component: CountriesComponent,
    children: [
      { path: '', redirectTo: 'country-list', pathMatch: 'full' },
      {
        path: 'country-list',
        component: CountryListComponent,
      },
      {
        path: 'country/:code',
        component: CountryComponent,
      },
    ],
  },
];
