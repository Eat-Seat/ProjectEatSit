import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/authservice.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-misreservas',
  imports: [FormsModule, CommonModule],
  templateUrl: './misreservas.component.html',
  styleUrls: ['./misreservas.component.css']
})
export class MisreservasComponent implements OnInit {
  reservas: any[] = [];
  user: any = null;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.getUser$().subscribe(user => {
      this.user = user;
      if (user?.id) {
        this.cargarReservas(user.id);
      }
    });
  }

  cargarReservas(userId: number): void {
    fetch(`http://localhost:3000/reservas?user_id=${userId}`)
      .then(res => res.json())
      .then(data => {
        this.reservas = data;
      })
      .catch(error => {
        console.error('Error al cargar reservas:', error);
      });
  }
  groupByCity(data: any[]): { [ciudad: string]: any[] } {
    return data.reduce((acc, curr) => {
      const ciudad = curr.ciudad || 'Unknown';
      if (!acc[ciudad]) {
        acc[ciudad] = [];
      }
      acc[ciudad].push(curr);
      return acc;
    }, {} as { [key: string]: any[] });
  }
}

