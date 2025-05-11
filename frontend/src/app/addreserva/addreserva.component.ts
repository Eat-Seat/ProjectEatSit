import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router} from '@angular/router';

@Component({
  selector: 'app-addreserva',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './addreserva.component.html',
  styleUrl: './addreserva.component.css'
})
export class AddreservaComponent implements OnInit{
  
  groupedRestaurantes: { [ciudad: string]: any[] } = {};
  formularioAbiertoId: number | null = null;

reservaForm = {
  nombre: '',
  apellidos: '',
  telefono: '',
  personas: null,
  fecha: '',
  hora:''
};
  reservaGuardada: boolean = false;
  constructor(private router:Router){};
  ngOnInit() {
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
      hora:''
    };
  }
  guardarReserva(restauranteId: number) {
  const body = {
    ...this.reservaForm,
    restaurante_id: restauranteId
  };

  fetch('http://localhost:3000/reservas', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        // alert('Reserva realizada con éxito');
          this.router.navigate(['/misreservas']);
      } else {
        // alert('Error al guardar la reserva');
      }
    })
    .catch(() => alert('Error de conexión con el servidor'));
  }
}
