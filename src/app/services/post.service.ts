import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { environment } from '@/environments/environment.dev';


@Injectable({
  providedIn: 'root'
})
export class PostService extends DataService {
  constructor (http: HttpClient) {
    super(environment.apiURL, http);
  }
}
