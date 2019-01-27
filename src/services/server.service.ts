import { Car } from './../app/models/car.model';
import { Injectable } from '@angular/core';
import { EventDTO } from 'src/app/models/event.model';
import { HttpClient } from '@angular/common/http';
import { StartSimulationDTO } from 'src/app/models/simulation.model';

@Injectable({
  providedIn: 'root'
})
export class ServerService {
  private baseServiceUrl = "http://localhost:7080";

  constructor(private http: HttpClient) { }

  getAllUnreadEvents() {
    return this.http.get<EventDTO[]>(
      this.baseServiceUrl + "/accidents"
    );
  }

  getAllCars() {
    return this.http.get<Car[]>(
      this.baseServiceUrl + "/cars/all"
    );
  }

  addCar(car: Car) {
    return this.http.post<Car>(
      this.baseServiceUrl + "/cars", car
    );
  }

  deleteCar(car: Car) {
    return this.http.delete<Car>(
      this.baseServiceUrl + "/cars/" + car.reg, 
    );
  }

  getAccident(id: number) {
    return this.http.get<EventDTO>(
      this.baseServiceUrl + "/accidents/" + id,
    );
  }

  startSimulation(startSimulationDTO: StartSimulationDTO) {
    this.http.post<any>(this.baseServiceUrl + "/simulation/start", startSimulationDTO).subscribe( () => console.log("START!"))
  }
}
