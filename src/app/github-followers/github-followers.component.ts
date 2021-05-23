import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { combineLatest } from 'rxjs';
import { GithubFollowersService } from '../services/github-followers.service';
import { Follower } from '../types/Follower';

@Component({
  selector: 'github-followers',
  templateUrl: './github-followers.component.html',
  styleUrls: ['./github-followers.component.css']
})
export class GithubFollowersComponent implements OnInit {
  followers: Follower[] = [];

  constructor(private route:ActivatedRoute, private githubService: GithubFollowersService) { }

  getFollowers(): void {
    this.githubService
    .getAll()
    .subscribe( (followers: Follower[])=> this.followers = followers)
  }

  getRouteParams(): void {
    combineLatest([
      this.route.paramMap,
      this.route.queryParamMap
    ]).subscribe(combined => {
      {
        let id = combined[0].get('id');
        let page = combined[1].get('page');
        console.log('id:', id, 'page:', page)
      }
    });
  }

  ngOnInit(): void {
    this.getRouteParams();
    this.getFollowers();

  }

}
