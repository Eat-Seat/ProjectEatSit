import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-log-in',
  standalone: true,
  imports: [FormsModule, RouterModule],
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.css'
})
export class LogInComponent {
  form: any = {};
  token?: string;
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  onSummit(){

  }
}
