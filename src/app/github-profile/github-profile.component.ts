import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'github-profile',
  templateUrl: './github-profile.component.html',
  styleUrls: ['./github-profile.component.css']
})
export class GithubProfileComponent implements OnInit {

  constructor(private route:ActivatedRoute) { }

  ngOnInit(): void {
    // User navigate away and come back
    let id = this.route.snapshot.paramMap.get('id');
    console.log(id);

    // //stay in the page - subscribe to an observable
    // this.route.paramMap
    //   .subscribe((params:any) => {
    //     let id = +params.get('id');
    //     console.log(id)
    //   })
  }

}
