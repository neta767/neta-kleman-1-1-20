import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FavoritesListComponent } from './favorites-list/favorites-list.component';
import { WeatherForecastComponent } from './weather-forecast/weather-forecast.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HttpClientModule } from '@angular/common/http';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { TopBarComponent } from './top-bar/top-bar.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from '@angular/common';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  declarations: [
    AppComponent,
    WeatherForecastComponent,
    FavoritesListComponent,
    PageNotFoundComponent,
    TopBarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    HttpClientModule,
    MatInputModule,
    MatTabsModule,
    MatSlideToggleModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatAutocompleteModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    MatButtonToggleModule,
    MatTooltipModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }