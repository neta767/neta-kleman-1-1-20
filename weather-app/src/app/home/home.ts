import { Component, OnInit } from '@angular/core';
import { RestService } from '../rest.service';
import { Store } from '@ngrx/store';
import { AddToFav, RemoveFromFav } from '../store/fav.actions';
import { ActivatedRoute } from '@angular/router';

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
  day?: string;
  temCelsius?: string;
  temFahrenheit?: string;
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
  city_id: string;
  metric: string = 'true';
  celsius: boolean = true;
  //
  inFavList: boolean = false;

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
    private route: ActivatedRoute,
    private store: Store<{ fav: [] }>
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
    if ((this.route.snapshot.paramMap.get('id')) != null && this.route.snapshot.paramMap.get('name') != null) {
      this.isOnTheFavoritesLise();
      //update city info
      this.updateInfo(this.route.snapshot.paramMap.get('id'), this.route.snapshot.paramMap.get('name'))
    }

    //get loaction by coords
    if ("geolocation" in navigator) {
      navigator.geolocation.watchPosition((success) => {
        this.rest.getGeopositionByCoords(success.coords.latitude.toString() + ',' + success.coords.longitude.toString()).subscribe(res => {
          this.updateInfo(res.Key, res.LocalizedName);
        })
      });
    }
  }

  updateInfo(locationKey: string, name: string) {
    //get current weather in locationKey
    this.rest.getCurrentConditions(locationKey).subscribe(res => {
      this.currentWeather = {
        city: name,
        id: locationKey,
        temCelsius: res[0].Temperature.Metric.Value,
        temFahrenheit: res[0].Temperature.Imperial.Value,
        weatherText: res[0].WeatherText
      }
    })

    this.isOnTheFavoritesLise();

    //get 5 Days Forecasts in celsius
    this.rest.getForecasts(locationKey, 'true').subscribe(res => {
      for (let index = 0; index < 5; index++) {
        this.weekForecast[index] = {
          day: this.getDayInWeek(new Date(res.DailyForecasts[index].Date).getDay()),
          temCelsius: res.DailyForecasts[index].Temperature.Maximum.Value
        }
      }
    })

    //get 5 Days Forecasts in fahrenheit
    this.rest.getForecasts(locationKey, 'false').subscribe(res => {
      for (let index = 0; index < 5; index++) {
        this.weekForecast[index].temFahrenheit = res.DailyForecasts[index].Temperature.Maximum.Value;
        this.weekForecast[index].day = this.weekForecast[index].day;
        this.weekForecast[index].temCelsius = this.weekForecast[index].temCelsius;
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
      this.updateInfo(res[0].Key, res[0].LocalizedName);
    })
  }

  isOnTheFavoritesLise() {
    // let arr: info[] = [];
    // arr = this.store.dispatch(new GetFavs());
    // // this.store.select(x => arr = x).subscribe();
    // // this.store.select('dataStore').subscribe(data => {
    //   console.log(data)
    // })
    // this.inFavList = arr.some(el => el.id === this.currentWeather.id);
  }
  updateFavoritesLise() {
    if (!this.inFavList) {
      this.store.dispatch(new AddToFav(this.currentWeather));
    }
    else {
      this.store.dispatch(new RemoveFromFav(this.currentWeather));
    }
    this.inFavList = !this.inFavList;
  }

  showError() {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '250px',
      data: { name: this.name, animal: this.animal }
    });
  }
}