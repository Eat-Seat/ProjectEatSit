import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { AuthService } from '../services/authservice.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterLink, RouterModule, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  authority: string | null = null;
user: any;
  
  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.getUser$().subscribe(user => {
      this.user = user;
    })
    this.authService.getAuthority$().subscribe(role => {
      this.authority = role;
    });
  }
}
