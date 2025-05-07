import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common'; 
import { AuthService } from '../services/authservice.service';


@Component({
  selector: 'app-log-in',
  standalone: true,
  imports: [CommonModule,FormsModule, RouterModule],
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.css'
})
export class LogInComponent {
  authority: string | null = null;
  constructor (private authservice: AuthService, private router: Router){}
  ngOnInit(){
    this.authservice.getAuthority$().subscribe(role => {
      this.authority = role;
    });
  }
  form: any = {};
  token?: string;
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  onSubmit() {
    console.log(this.form);
  
    if (!this.form.email || !this.form.password) {
      this.isLoginFailed = true;
      this.errorMessage = 'Please fill in both fields.';
      return;
    }
  
    fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.form)
    })
    .then(response => response.json())
    .then(data => {
      //console.log("entro")
      if (data.success) {
        const user = data.user;
        this.authservice.setUser(user);  
        this.isLoggedIn = true;
        this.router.navigate(['/dashboard']);
      } else {
        console.error('Login failed:', data.message);
        this.isLoginFailed = true;
        this.errorMessage = data.message;
      }
    })
    .catch(error => {
      console.error('Error during login:', error);
      this.isLoginFailed = true;
      this.errorMessage = error.message;
    });
  }
  
}
