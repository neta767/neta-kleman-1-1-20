import { Component, OnInit } from '@angular/core';
import { RestService } from '../rest.service';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { startWith, map } from 'rxjs/operators';
import { FavoritesService } from '../favorites.service';
import { Store } from '@ngrx/store';
// import { addCity } from '../store/fav.actions';

// export interface city {
//   Key: string;
//   LocalizedName: string;
// }

export interface info {
  id: string;
  city: string;
  weatherText: string;
  temCelsius: string;
  temFahrenheit: string;
}

export interface dayWeather {
  day: string;
  temCelsius: string;
  temFahrenheit: string;
}

export interface cityInfo {
  id: string;
  name: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.html',
  styleUrls: ['./home.scss']
})
export class HomeComponent implements OnInit {
  metric: string = 'true';
  celsius: boolean = true;
  //
  public onList: boolean = false;

  cityCtrl = new FormControl();
  filteredCitys: Observable<cityInfo[]>;
  citys: cityInfo[] = [];

  currentWeather: info = {
    id: '',
    city: '',
    weatherText: '',
    temCelsius: '',
    temFahrenheit: '',
  }

  emptyForecast: dayWeather = { day: '', temCelsius: '', temFahrenheit: '' }
  weekForecast: dayWeather[] = [this.emptyForecast, this.emptyForecast, this.emptyForecast, this.emptyForecast, this.emptyForecast];

  constructor(
    public rest: RestService,
    // public favorites: FavoritesService,
    // private store: Store<{ count: number }>
  ) {
    this.filteredCitys = this.cityCtrl.valueChanges
      .pipe(
        startWith(''),
        map(city => city ? this._filterCitys(city) : this.citys.slice())
      );
  }

  private _filterCitys(value: string): cityInfo[] {
    const filterValue = value.toLowerCase();
    return this.citys.filter(city => city.name.toLowerCase().indexOf(filterValue) === 0);
  }

  ngOnInit() {
    //get loaction by coords
    if ("geolocation" in navigator) {
      navigator.geolocation.watchPosition((success) => {
        this.rest.getGeopositionByCoords(success.coords.latitude.toString() + ',' + success.coords.longitude.toString()).subscribe(res => {
          //update city info
          this.currentWeather.city = res.LocalizedName;
          this.currentWeather.id = res.key;

          this.getWeather(res.Key);
        })
      });
    }
  }

  getWeather(locationKey: string) {
    //get current weather in locationKey
    this.rest.getCurrentConditions(locationKey).subscribe(res => {
      this.currentWeather.weatherText = res[0].WeatherText;
      this.currentWeather.temCelsius = res[0].Temperature.Metric.Value;
      this.currentWeather.temFahrenheit = res[0].Temperature.Imperial.Value;
    })

    //get 5 Days Forecasts in celsius
    this.rest.getForecasts(locationKey, 'true').subscribe(res => {
      for (let i = 0; i < 5; i++) {
        this.weekForecast[i].day = res.DailyForecasts[i].Date;
        this.weekForecast[i].temCelsius = res.DailyForecasts[i].Temperature.Maximum.Value;
      }
    })

    //get 5 Days Forecasts in fahrenheit
    this.rest.getForecasts(locationKey, 'false').subscribe(res => {
      for (let i = 0; i < 5; i++) {
        this.weekForecast[i].temFahrenheit = res.DailyForecasts[i].Temperature.Maximum.Value;
      }
    });
  }

  onUnitTemChange(temUnit: string) {
    temUnit === 'c' ? this.celsius = true : this.celsius = false;
    // this.rest.getForecasts(this.cityKey, this.metric).subscribe(res => {
    //   this.forecastWeather = res;
    // })
  }

  public onChange(searchingText: string): void {
    this.rest.getAutocomplete(searchingText).subscribe(res => {
      this.citys = (JSON.parse(JSON.stringify(res, ['Key', 'LocalizedName'])));
      console.log(this.citys)
    })
  }



  onTheFavoritesLisr() {
    // this.favorites.isExist(key)

  }

  search(cityName: string) {
    this.rest.getAutocomplete(cityName).subscribe(res => {
      this.getWeather(res[0].Key);
    })
  }



  // addToFavorites(key, name) {
  // this.store.dispatch(addCity({ id: key, name: name }));
  // }
}