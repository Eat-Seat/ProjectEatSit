import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-restaurant',
  imports: [CommonModule, FormsModule],
  templateUrl: './add-restaurant.component.html',
  styleUrl: './add-restaurant.component.css'
})
export class AddRestaurantComponent {
  hasError: any;
  errorMessage: any;
  restaurantForm = {
    name: '',
    address: '',
    city: '',
    capacity: null
  };
  onSubmit() {
  
  }
}
