import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { environment } from '../../environments/environment';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule], 
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  form: any = {};
  isSignedUp = false;
  isSignUpFailed = false;
  errorMessage = '';

  constructor(){}
  onSubmit() {
    console.log(this.form);
  
    // if (!this.form.firstname || !this.form.lastname || !this.form.email || !this.form.password || !this.form.phone || !this.form.role) {
    //   this.isSignUpFailed = true;
    //   this.errorMessage = 'Please fill in all required fields.';
    //   return;
    // }
  
    fetch(`${environment.apiUrl}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.form)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to register user');
      }
      return response.json();
    })
    .then(data => {
      console.log('User successfully registered:', data);
      this.isSignedUp = true;
    })
    .catch(error => {
      console.error('Error registering user:', error);
      this.isSignUpFailed = true;
      this.errorMessage = error.message;
    });
  }
  
}
