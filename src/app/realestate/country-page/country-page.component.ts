import {Component, OnInit, Input, Output, ViewChild} from '@angular/core';
import { Country } from '../country.model';
import {FeatureCollection, RealEstateService, Marker} from '../realestate.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import {DxVectorMapComponent} from 'devextreme-angular';
import * as mapsData from 'devextreme/dist/js/vectormap-data/world.js';
import component from 'devextreme/core/component';

@Component({
  selector: 'app-country-page',
  templateUrl: './country-page.component.html',
  styleUrls: ['./country-page.component.css']
})
export class CountryPageComponent implements OnInit {
  @ViewChild(DxVectorMapComponent, { static: false }) vectorMap: DxVectorMapComponent;
  countryName: string;
  country: Country;
  // countryData: Country;
  countryMap: FeatureCollection;
  countryCenter: Array<number>;
  markers: Marker[];
  capitalMarker: Marker[];
  countryZoom: string;
  show = false;
  isLoading = false;

  constructor(public realEstateService: RealEstateService, public route: ActivatedRoute) {
    this.markers = realEstateService.getMarkers();
  }

  customizeCoordinates(countryName: string): void {
    for (const country of mapsData.world.features) {
      if (countryName === 'South Korea'){
        countryName = 'Korea';
      }
      if (countryName === country.properties.name) {
        this.countryMap = this.realEstateService.getCountryBorders(countryName, country.geometry.coordinates);
      }
    }
  }

  customizeTooltip(arg): { text: any } {
    if (arg.layer.type === 'marker') {
      return {
        text: arg.attribute('name')
      };
    }
  }

  findCountryCenter(countryCapital: string): void {
    for (const capital of this.markers){
      if (capital.attributes.name === countryCapital) {
        this.countryCenter = capital.coordinates;
        const defaultCenter = [0, 0];
        if (capital.center[0] !== defaultCenter[0] && capital.center[1] !== defaultCenter[1]) {
          this.countryCenter = capital.center;
        }
        this.capitalMarker = [capital];
        this.countryZoom = capital.zoom;
      }
    }
  }

  // tslint:disable-next-line:typedef
  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('country_name')) {
        this.isLoading = true;
        this.countryName = paramMap.get('country_name');
        this.realEstateService.getOneCountry(this.countryName).subscribe(countryData => {
          this.country = {
            countryName: countryData.countryName,
            capitalCity: countryData.capitalCity,
            population: countryData.population,
            urbanRent: countryData.urbanRent,
            ruralRent: countryData.ruralRent,
            urbanPE: countryData.urbanPE,
            ruralPE: countryData.ruralPE,
            interestRate: countryData.interestRate,
            debtGDP: countryData.debtGDP,
            inflation: countryData.inflation,
            bondSymbol: countryData.bondSymbol,
            urbanSymbol: countryData.urbanSymbol,
            ruralSymbol: countryData.ruralSymbol,
            countrySummary: countryData.countrySummary
          };
          this.customizeCoordinates(this.countryName);
          this.findCountryCenter(countryData.capitalCity);
          this.isLoading = false;
        });
      }});
  }

}
