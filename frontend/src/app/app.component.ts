import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { RestaurantsComponent } from "./restaurants/restaurants.component";

@Component({
  selector: 'app-root',
  standalone: true, 
  imports: [RouterOutlet, RouterLink, 
    RestaurantsComponent,], 
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']  
})
export class AppComponent {
  title = 'frontend';
}
