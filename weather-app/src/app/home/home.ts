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

  // cityCtrl = new FormControl();
  // filteredCitys: Observable<cityInfo[]>;
  // citys: cityInfo[] = [];

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
    private store: Store<{ fav: number }>
  ) {
    // this.filteredCitys = this.cityCtrl.valueChanges
    //   .pipe(
    //     startWith(''),
    //     map(city => city ? this._filterCitys(city) : this.citys.slice())
    //   );
  }

  // private _filterCitys(value: string): cityInfo[] {
  //   const filterValue = value.toLowerCase();
  //   return this.citys.filter(city => city.name.toLowerCase().indexOf(filterValue) === 0);
  // }

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
      for (let index = 0; index < 5; index++) {
        this.weekForecast[index].day = this.getDayInWeek(new Date(res.DailyForecasts[index].Date).getDay());
        this.weekForecast[index].temCelsius = res.DailyForecasts[index].Temperature.Maximum.Value;
      }
    })

    //get 5 Days Forecasts in fahrenheit
    this.rest.getForecasts(locationKey, 'false').subscribe(res => {
      for (let index = 0; index < 5; index++) {
        this.weekForecast[index].temFahrenheit = res.DailyForecasts[index].Temperature.Maximum.Value;

      }
    })
  }

  getDayInWeek(num: number): string {
    var dayNames = { 0: 'Sunday', 1: 'Monday', 2: 'Tuesday', 3: 'Wednesday', 4: 'Thursday', 5: 'Friday', 6: 'Saturday', };
    return dayNames[num];;
  }

  onUnitTemChange(temUnit: string) {
    temUnit === 'c' ? this.celsius = true : this.celsius = false;
  }

  // public onKeyUp(searchingText: string): void {
  // this.rest.getAutocomplete(searchingText).subscribe(res => {
  //   res.forEach(element => {
  //     this.citys.push({ id: element.key, name: element.LocalizedName })
  //   });
  //   console.log(this.citys)
  // })
  // }

  // searchWeatherByKey(key: string, name: string) {
  //   //update city info
  //   this.currentWeather.city = name;
  //   this.currentWeather.id = key;
  //   this.getWeather(key);
  // }

  searchWeatherByName(cityName: string) {
    this.rest.getAutocomplete(cityName).subscribe(res => {
      //update city info
      this.currentWeather.city = res[0].LocalizedName;
      this.currentWeather.id = res[0].key;
      this.getWeather(res[0].Key);
    })
  }

  isOnTheFavoritesLise() {
    // this.favorites.isExist(key)
  }

  updateFavoritesLise() {
    // this.store.dispatch(addCity({ id: key, name: name }));
  }
}