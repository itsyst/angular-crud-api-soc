import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { combineLatest } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { GithubFollowersService } from '../../services/github/github-followers.service';
import { Follower } from '../../types/Follower';

@Component({
  selector: 'github-followers',
  templateUrl: './github-followers.component.html',
  styleUrls: ['./github-followers.component.css']
})
export class GithubFollowersComponent implements OnInit {
  followers: Follower[] = [];

  constructor(private route:ActivatedRoute, private githubService: GithubFollowersService) { }

  getRouteParamsAndFollowers(): void {
    combineLatest([
      this.route.paramMap,
      this.route.queryParamMap
    ])
      .pipe(
        switchMap((combined: any) => {
          let id = combined[0].get('id');
          let page = combined[1].get('page');
          console.log('id:', id, 'page:', page);

          return this.githubService.getAll();
        })
     ).subscribe((followers: Follower[])=> this.followers = followers)
  }

  ngOnInit(): void {
    this.getRouteParamsAndFollowers();
  }

}
