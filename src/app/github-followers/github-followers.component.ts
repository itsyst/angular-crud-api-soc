import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
    this.route.queryParamMap
      .subscribe(params =>
      {
        let page = params.get('page');
        console.log(page)
      }
      );
  }

  ngOnInit(): void {
    this.getRouteParams()
    this.getFollowers();
  }

}
