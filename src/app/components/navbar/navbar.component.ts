import { environment } from '@/environments/environment';
import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  backgroundColor = environment.navBarBackgroundColor;

  constructor() { }
}
