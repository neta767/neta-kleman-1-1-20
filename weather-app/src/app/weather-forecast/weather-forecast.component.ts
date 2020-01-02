import { Component, OnInit, AfterViewInit } from '@angular/core';
import { RestService } from '../rest.service';

@Component({
  selector: 'app-weather-forecast',
  templateUrl: './weather-forecast.component.html',
  styleUrls: ['./weather-forecast.component.scss']
})
export class WeatherForecastComponent implements OnInit, AfterViewInit {
  lat: number;
  lon: number;

  constructor(public rest: RestService) { }
  todayWeather = {};
  forecastWeather = [];
  metric: string = 'true';

  ngAfterViewInit() {

    this.getLocation();
  }

  ngOnInit() {
    // this.rest.deleteProduct(id)
    //   .subscribe(res => {
    //     this.getProducts();
    //   }, (err) => {
    //     console.log(err);
    //   }
    //   );
  }

  getLocation() {
    if ("geolocation" in navigator) {
      navigator.geolocation.watchPosition((success) => {
        this.lat = success.coords.latitude;
        this.lon = success.coords.longitude;
        console.log('lat' + this.lat)
        console.log('lon' + this.lon)

        this.rest.getGeopositionByCoords(this.lat.toString() + ',' + this.lon.toString()).subscribe(res => {
          this.getWeather(res.Key)
        })
      });
    }
  }

  getWeather(locationKey: string) {
    this.rest.getCurrentConditions(locationKey).subscribe(res => {
      this.todayWeather = res[0];
      console.log(res[0])
    })

    this.rest.getForecasts(locationKey, this.metric).subscribe(res => {
      this.forecastWeather = res;
      console.log(res)
    })
  }
}