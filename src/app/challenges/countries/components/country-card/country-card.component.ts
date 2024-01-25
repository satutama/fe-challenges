import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Country } from '../../services/countries.service';

@Component({
  selector: 'app-country-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './country-card.component.html',
  styleUrls: ['./country-card.component.scss'],
})
export class CountryCardComponent {
  @Input() country!: Country;

  public get capital() {
    return this.country.capital?.length > 1
      ? this.country.capital.join(', ')
      : this.country.capital;
  }
}
