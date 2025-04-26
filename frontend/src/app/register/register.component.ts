import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common'; 

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

  onSummit() {
    this.isSignedUp = true;
  }
}
