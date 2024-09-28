import { CountriesService } from './../../services/countries.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'app-country-page',
  templateUrl: './country-page.component.html',
  styleUrl: './country-page.component.css'
})
export class CountryPageComponent implements OnInit{

  public country?: Country;

  constructor(
    private activaterRoute: ActivatedRoute,
    private router: Router,
    private countriesService: CountriesService,
  ){}

  ngOnInit(): void {
    this.activaterRoute.params
      .pipe(
        switchMap(({id}) => this.countriesService.searchCountryByAlphaCode(id)),
      )
      .subscribe(country => {
        if(!country) return this.router.navigateByUrl('');
        return this.country = country;
      });
  }

}


