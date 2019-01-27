import { AccidentComponent } from './accident/accident.component';
import { HomeComponent } from './home/home.component';
import { CarsComponent } from './cars/cars.component';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from './material.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AgmCoreModule } from '@agm/core';

import { AppComponent } from './app.component';
import { MapComponent } from './map/map.component';
import { HeaderComponent } from './header/header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ServerService } from 'src/services/server.service';
import { HttpClientModule } from '@angular/common/http';

const routes: Routes = [
  { path: 'cars', component: CarsComponent },
  { path: 'accidents/:id', component: AccidentComponent },
  { path: '', component: HomeComponent },
  ];

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    HeaderComponent,
    HomeComponent,
    CarsComponent,
    AccidentComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCGLptHU1bFoDQ4QWd2Ou1hPW-MwODaLhk'
    }),
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  exports: [RouterModule],
  providers: [ServerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
