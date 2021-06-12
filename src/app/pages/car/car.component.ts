import { Component, OnInit } from '@angular/core';
import { CarService } from '@/app/services/car/car.service';
import { Car } from '@/app/types/car';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {
  cars: Car[] = [];

  constructor(private carService: CarService) { }

  getCars(): void {
    this.carService
    .getAll()
      .subscribe((cars: Car[]) => {
        this.cars = Object.values(Object.values(cars)[0]);
      })
  }

  ngOnInit(): void {
    this.getCars();
  }

}
