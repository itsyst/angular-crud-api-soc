import { environment } from '../../../environments/environment.dev';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from '../data/data.service';

@Injectable({
  providedIn: 'root'
})
export class CarService extends DataService {

    constructor (http: HttpClient) {
    super(environment.apiCar, http);
  }
}
