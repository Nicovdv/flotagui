import { Car } from './../models/car.model';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MouseEvent, AgmMap } from '@agm/core';
import { interval } from 'rxjs';
import { timeInterval, flatMap } from 'rxjs/operators';
import { ServerService } from 'src/services/server.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  @ViewChild(AgmMap) map: AgmMap;

  constructor(private serverService: ServerService) {
    this.serverService.getAllCars().subscribe(result => {
      this.markers = [];
      result.forEach(item => {
        if (item.active) {
          this.markers.push(this.getMarker(item));
        }
      });

      console.log(this.markers);

      this.initTimer();
    });
}

  markers: marker[] = [];

  latitude = 52.2330653;
  longitude = 20.9211119;

  initTimer() {
    interval(1000)
      .pipe(
        flatMap(() => this.serverService.getAllCars())
      )
      .subscribe((result) => {
        this.markers = [];
        result.forEach(item => {
          if (item.active) {
            this.markers.push(this.getMarker(item));
          }
        })
      });
  }

  getMarker(car: Car): marker {
    return {
      lat: car.lati,
      lng: car.longi,
      label: car.reg,
    };
  }

  ngOnInit() {
  }

}

interface marker {
  lat: number;
  lng: number;
  label?: string;
}
