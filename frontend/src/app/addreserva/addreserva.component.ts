import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/authservice.service';
import { environment } from '../../environments/environment';

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

    fetch(`${environment.apiUrl}/restaurants`)
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

  fetch(`${environment.apiUrl}/reservas`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  })
    .then(async res => {
      let data;
      try {
        data = await res.json();
      } catch {
        throw new Error("Respuesta inesperada del servidor.");
      }

      if (!res.ok) {
        if (res.status === 400 && data?.error === "Capacity exceeded") {
          alert("No hay suficientes plazas disponibles para esa fecha.");
        } else {
          alert(`Error al guardar la reserva: ${data?.error || `Código ${res.status}`}`);
        }
        return;
      }
      if (data.success) {
        this.router.navigate(['/misreservas']);
      } else {
        alert('Error al guardar la reserva.');
      }
    })
    .catch(err => {
      alert(`Error de conexión con el servidor: ${err.message || 'Inténtalo de nuevo más tarde.'}`);
    });
  }
}