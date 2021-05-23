import { Component, OnInit } from '@angular/core';
import { GithubFollowersService } from '../services/github-followers.service';
import { Follower } from '../types/Follower';

@Component({
  selector: 'github-followers',
  templateUrl: './github-followers.component.html',
  styleUrls: ['./github-followers.component.css']
})
export class GithubFollowersComponent implements OnInit {
  followers: Follower[] = [];

  constructor(private githubService: GithubFollowersService) { }

  getFollowers(): void {
    this.githubService
    .getAll()
    .subscribe( (followers: Follower[])=> this.followers = followers)
  }

  ngOnInit(): void {
    this.getFollowers();
  }

}
