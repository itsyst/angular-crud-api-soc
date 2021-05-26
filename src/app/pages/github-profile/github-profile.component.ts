import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'github-profile',
  templateUrl: './github-profile.component.html',
  styleUrls: ['./github-profile.component.css']
})
export class GithubProfileComponent implements OnInit {
  id!: string | null;
  constructor(private route:ActivatedRoute, private router:Router) { }

  submit() {
    this.router.navigate(['/followers'], {queryParams: {page:1, order:'newest'}})
  }

  ngOnInit(): void {
    // User navigate away and come back
    this.id = this.route.snapshot.paramMap.get('id');
    console.log(this.id);

    // //stay in the page - subscribe to an observable
    // this.route.paramMap
    //   .subscribe((params:any) => {
    //     let id = +params.get('id');
    //     console.log(id)
    //   })
  }

}
