import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { Car } from '../models/car.model';
import { ServerService } from 'src/services/server.service';
import { StartSimulationDTO } from '../models/simulation.model';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.css']
})
export class CarsComponent implements OnInit {
  car: Car = new Car();

  cars: Car[] = [];

  subscribes: any[] = [];

  newXmlActive: boolean;

  displayedColumns: string[] = ['name', 'active', 'goTo', 'deleteButton'];
  dataSource = new MatTableDataSource(this.cars);

  constructor(private serverService: ServerService,
    private router: Router) {
    this.newXmlActive = false;
  }

  ngOnInit() {
    this.reloadCars(); 
  }

  ngOnDestroy() {
    this.subscribes.forEach(element => {
      element.unsubscribe();
    });
  }

  onClickCancel() {
    this.newXmlActive = false;
  }

  onClickCreate(edit: boolean) {
    this.serverService.addCar(this.car).subscribe(result => {
      this.reloadCars();
      if(edit) {
        this.router.navigate(['']);
      }
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  reloadCars() {
    this.serverService.getAllCars().subscribe(result => {
      this.cars = result;
      this.dataSource.data = this.cars;
    });
  }

  onAddXml() {
    this.newXmlActive = true;
  }

  onClickDeleteButton(element: Car) {
    this.serverService.deleteCar(element).subscribe(result => {
      this.reloadCars();
    });
  }

  sendToPlace(element: Car) {
    let startSimulationDTO = new StartSimulationDTO("Warszawa Centrum", "Sulejówek Milosna PKP", element.reg);

    this.serverService.startSimulation(startSimulationDTO);

    this.reloadCars();
  }
}
