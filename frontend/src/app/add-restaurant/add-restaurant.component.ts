import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/authservice.service';
import { RouterModule } from '@angular/router';
import { environment } from '../../environments/environment';


@Component({
  selector: 'app-add-restaurant',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './add-restaurant.component.html',
  styleUrl: './add-restaurant.component.css'
})
export class AddRestaurantComponent implements OnInit{

  hasError: boolean = false;
  restaurantcreated: boolean = false;
  errorMessage: string = '';
  user: any = null;
  restaurantForm = {
    name: '',
    address: '',
    city: '',
    capacity: null
  };
  constructor (private authservice: AuthService){};
  ngOnInit() {
    this.authservice.getUser$().subscribe(user => {
      this.user = user;
    })
  }
  onSubmit() {
  if (!this.user || !this.user.id) {
    this.hasError = true;
    this.errorMessage = 'User is not authenticated.';
    return;
  }

  const restaurantData = {
    nombre: this.restaurantForm.name,
    direccion: this.restaurantForm.address,
    ciudad: this.restaurantForm.city,
    capacidad: this.restaurantForm.capacity,
    owner_id: this.user.id
  };

  fetch(`${environment.apiUrl}/restaurants`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(restaurantData)
  })
  .then(response => response.json())
  .then(data => {
    if (data.success) {
      console.log('Restaurant created successfully');
      this.hasError = false;
      this.errorMessage = '';
      this.restaurantcreated = true;
      console.log(data);
    } else {
      this.hasError = true;
      this.errorMessage = data.message || 'Error creating restaurant.';
    }
  })
  .catch(error => {
    console.error('Fetch error:', error);
    this.hasError = true;
    this.errorMessage = 'Server connection error.';
  });
}

}
