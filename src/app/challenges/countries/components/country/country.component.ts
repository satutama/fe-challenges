import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { Country } from '../../country';
import { CountriesService } from '../../services/countries.service';

@Component({
  selector: 'app-country',
  standalone: true,
  imports: [CommonModule, RouterModule],
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
      switchMap((params) =>
        this.countriesService.getCountry(params.get('code') ?? '')
      )
    );
  }
}
