import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { Country } from '../../country';
import { CountriesService } from '../../services/countries.service';

@Component({
  selector: 'app-country',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.scss'],
})
export class CountryComponent implements OnInit {
  public country$!: Observable<Country>;

  constructor(
    private route: ActivatedRoute,
    private countriesService: CountriesService
  ) {}

  public ngOnInit(): void {
    this.country$ = this.route.paramMap.pipe(
      switchMap((params) => {
        console.log(params.get('name'));

        const name = params.get('name');
        return this.countriesService.getCountry(name ?? '');
      })
    );
  }
}
