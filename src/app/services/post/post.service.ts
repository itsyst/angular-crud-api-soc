import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from '../data/data.service';
import { environment } from '@/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class PostService extends DataService {
  constructor (http: HttpClient) {
    super(environment.apiURL, http);
  }
}
