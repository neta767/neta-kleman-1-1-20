import { Component, OnInit, AfterViewInit } from '@angular/core';
import { RestService } from '../rest.service';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { startWith, map } from 'rxjs/operators';

export interface city {
  Key: string;
  LocalizedName: string;
}

export interface todayWeather {
  WeatherText: string;
  TemperatureCelsius: string;
  TemperatureFahrenheit: string;
}

export interface dayWeather {
  day: string;
  Temperature: string;
}

@Component({
  selector: 'app-weather-forecast',
  templateUrl: './weather-forecast.component.html',
  styleUrls: ['./weather-forecast.component.scss']
})
export class WeatherForecastComponent implements OnInit, AfterViewInit {
  metric: string = 'true';
  celsius: boolean = true;
  //
  public onList: boolean = false;
  //

  public cityKey = '5655';
  public cityName = 'Tel Aviv';

  cityCtrl = new FormControl();
  filteredCitys: Observable<city[]>;

  citys: city[] = [];
  todayWeather: todayWeather = {
    WeatherText: 'Shsadtrf',
    TemperatureCelsius: '13',
    TemperatureFahrenheit: '33',
  }

  try: dayWeather = { Temperature: '15', day: 'monday' }
  forecastWeather: dayWeather[] = [this.try, this.try, this.try, this.try, this.try];

  constructor(public rest: RestService) {
    this.filteredCitys = this.cityCtrl.valueChanges
      .pipe(
        startWith(''),
        map(city => city ? this._filterCitys(city) : this.citys.slice())
      );
  }

  private _filterCitys(value: string): city[] {
    const filterValue = value.toLowerCase();
    return this.citys.filter(city => city.LocalizedName.toLowerCase().indexOf(filterValue) === 0);
  }

  public onChange(searchingText: string): void {
    this.rest.getAutocomplete(searchingText).subscribe(res => {
      this.citys = (JSON.parse(JSON.stringify(res, ['Key', 'LocalizedName'])));
      console.log(this.citys)
    })
  }

  ngAfterViewInit() {

  }

  ngOnInit() {
    this.getLocation();
    // this.rest.deleteProduct(id)
    //   .subscribe(res => {
    //     this.getProducts();
    //   }, (err) => {
    //     console.log(err);
    //   }
    //   );
  }

  search(cityName: string) {
    this.rest.getAutocomplete(cityName).subscribe(res => {
      this.getWeather(res[0].Key);
    })
  }

  getLocation() {
    if ("geolocation" in navigator) {
      navigator.geolocation.watchPosition((success) => {
        this.rest.getGeopositionByCoords(success.coords.latitude.toString() + ',' + success.coords.longitude.toString()).subscribe(res => {
          this.getWeather(res.Key)
        })
      });
    }
  }

  getWeather(locationKey: string) {
    this.rest.getCurrentConditions(locationKey).subscribe(res => {
      this.todayWeather.WeatherText = res[0].WeatherText;
      this.todayWeather.TemperatureCelsius = res[0].Temperature.Metric.Value;
      this.todayWeather.TemperatureFahrenheit = res[0].Temperature.Imperial.Value;
    })

    this.rest.getForecasts(locationKey, this.metric).subscribe(res => {
      this.forecastWeather = res;
      console.log(res)
    })
  }

  onValChange(tempUnit: string) {
    tempUnit === 'c' ? this.celsius = true : this.celsius = false;
    this.rest.getForecasts(this.cityKey, this.metric).subscribe(res => {
      this.forecastWeather = res;
    })
  }

  addToFavorites() {
    this.onList = !this.onList;
  }
}