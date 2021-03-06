import { environment } from '@/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from '../data/data.service';

@Injectable({
  providedIn: 'root'
})
export class GithubFollowersService extends DataService {

  constructor (http: HttpClient) {
    super(environment.apiGitHub, http);
  }
}
