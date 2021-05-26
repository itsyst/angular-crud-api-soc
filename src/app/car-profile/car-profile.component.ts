import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-car-profile',
  templateUrl: './car-profile.component.html',
  styleUrls: ['./car-profile.component.css']
})
export class CarProfileComponent implements OnInit {
  car!: string | null;
  constructor(private router: Router, private route:ActivatedRoute) { }

  viewAll() {
    this.router.navigate(['/cars'])
  }

  ngOnInit(): void {
    let params = this.route.snapshot.paramMap;
    this.car = params.get('car');
  }
}
