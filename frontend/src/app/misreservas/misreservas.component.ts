import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/authservice.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { environment } from '../../environments/environment';


@Component({
  selector: 'app-misreservas',
  imports: [FormsModule, CommonModule],
  templateUrl: './misreservas.component.html',
  styleUrls: ['./misreservas.component.css']
})
export class MisreservasComponent implements OnInit {
  reservas: any[] = [];
  user: any = null;
  editandoId: number | null = null;
  formularioEdicion = {
    nombre: '',
    apellidos: '',
    telefono: '',
    personas: 1,
    fecha: '',
    hora: ''
  };


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
    fetch(`${environment.apiUrl}/reservas?user_id=${userId}`)
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
  borrarReserva(reservaId: number): void {
  if (confirm('¿Estás seguro de que quieres borrar esta reserva?')) {
    fetch(`${environment.apiUrl}/reservas/${reservaId}`, {
      method: 'DELETE'
    })
      .then(res => res.json())
      .then(() => {
        this.reservas = this.reservas.filter(r => r.reserva_id !== reservaId);
      })
      .catch(error => {
        console.error('Error al borrar la reserva:', error);
      });
  }
}
  editarReserva(r: any) {
    this.editandoId = r.reserva_id;
    this.formularioEdicion = {
      nombre: r.nombre,
      apellidos: r.apellidos,
      telefono: r.telefono,
      personas: r.personas,
      fecha: r.fecha,
      hora: r.hora
    };
  }
  guardarEdicion(r: any) {
  const id = r.reserva_id;

  fetch(`${environment.apiUrl}/reservas/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(this.formularioEdicion)
  })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        Object.assign(r, this.formularioEdicion);
        this.editandoId = null;
      } else {
        alert('Error al actualizar la reserva');
      }
    })
    .catch(error => {
      console.error('Error al guardar la edición:', error);
      alert('Error de conexión con el servidor');
    });
}
}

