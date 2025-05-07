import { Component, OnInit } from '@angular/core';
import { RouterOutlet, RouterLink, RouterModule, Router } from '@angular/router';
import { AuthService } from './services/authservice.service'; 
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true, 
  imports: [RouterOutlet, RouterLink, RouterModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']  
})
export class AppComponent implements OnInit {
  title = 'frontend';
  authority: string | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.authService.clear();
    this.authService.getAuthority$().subscribe(role => {
      this.authority = role;
    });
    console.log(this.authService.getUser());
  }
  logout(){
    this.authService.logout();
    this.router.navigate(['/dashboard']);
  }
}
