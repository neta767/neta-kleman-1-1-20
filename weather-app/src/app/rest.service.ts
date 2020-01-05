import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RestService {
  url = 'http://dataservice.accuweather.com/';
  // apiKey = 'ZkzqEU3O6h9XApVvsnAODmxGppdGXYiK';
  // apiKey = 'p6LxgnGQ6hvcznFR5xsGzELOF3L3mysb';
  apiKey = '7EaKMkdzVANL9Af6qySLkYkLaB43IOtE';
  
  constructor(private http: HttpClient) { }
  // getHeroes (): Observable<Hero[]> {
  //   return this.http.get<Hero[]>(this.heroesUrl)
  //     .pipe(
  //       catchError(this.handleError<Hero[]>('getHeroes', []))
  //     );
  // }

  // return this.http.get<CustomersData>(settings.url, {
  //     params: params, 
  //     responseType: 'json'})
  //     .toPromise()
  //     .then(response => response)
  //     .catch(err => this.handleError(err));



  getAutocomplete(city: string): Observable<any> {
    const params = new HttpParams()
      .set('apikey', this.apiKey)
      .set('q', city)
    return this.http.get(`${this.url}locations/v1/cities/autocomplete`, { params });
  }

  getCurrentConditions(locationKey: string): Observable<any> {
    const params = new HttpParams()
      .set('apikey', this.apiKey)
    return this.http.get(`${this.url}currentconditions/v1/${locationKey}`, { params });
  }

  getForecasts(locationKey: string, metric: string): Observable<any> {
    const params = new HttpParams()
      .set('apikey', this.apiKey)
      .set('metric', metric)
    return this.http.get(`${this.url}forecasts/v1/daily/5day/${locationKey}`, { params });
  }

  getGeopositionByCoords(coords: string): Observable<any> {
    const params = new HttpParams()
      .set('apikey', this.apiKey)
      .set('q', coords)
    return this.http.get(`${this.url}locations/v1/cities/geoposition/search`, { params });
  }
}
