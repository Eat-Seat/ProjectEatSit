import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/authservice.service';

@Component({
  selector: 'app-addreserva',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './addreserva.component.html',
  styleUrl: './addreserva.component.css'
})
export class AddreservaComponent implements OnInit {
  groupedRestaurantes: { [ciudad: string]: any[] } = {};
  formularioAbiertoId: number | null = null;

  reservaForm = {
    nombre: '',
    apellidos: '',
    telefono: '',
    personas: null,
    fecha: '',
    hora: ''
  };

  reservaGuardada: boolean = false;
  user: any = null;

  constructor(private router: Router, private authservice: AuthService) {}

  ngOnInit() {
    this.authservice.getUser$().subscribe(user => {
      this.user = user;
    });

    fetch('http://localhost:3000/restaurants')
      .then(res => res.json())
      .then(data => {
        this.groupedRestaurantes = this.groupByCity(data);
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

  addreserva(r: any) {
    this.formularioAbiertoId = r.id;
    this.reservaForm = {
      nombre: '',
      apellidos: '',
      telefono: '',
      personas: null,
      fecha: '',
      hora: ''
    };
  }

  guardarReserva(restauranteId: number) {
    if (!this.user?.id) {
      alert("Debes estar logueado para hacer una reserva");
      return;
    }

    const body = {
      ...this.reservaForm,
      restaurante_id: restauranteId,
      user_id: this.user.id
    };
    console.log(body);

    fetch('http://localhost:3000/reservas', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          this.router.navigate(['/misreservas']);
        } else {
          alert('Error al guardar la reserva');
        }
      })
      .catch(() => alert('Error de conexión con el servidor'));
  }
}