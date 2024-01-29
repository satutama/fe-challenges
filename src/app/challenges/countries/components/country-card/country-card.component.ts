import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Country } from '../../country';

@Component({
  selector: 'app-country-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './country-card.component.html',
})
export class CountryCardComponent {
  @Input() country!: Country;

  public get capital() {
    return this.country.capital?.length > 1
      ? this.country.capital.join(', ')
      : this.country.capital;
  }
}
