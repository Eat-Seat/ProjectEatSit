import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/authservice.service';

@Component({
  selector: 'app-view-restaurants',
  imports: [CommonModule, FormsModule],
  templateUrl: './view-restaurants.component.html',
  styleUrl: './view-restaurants.component.css'
})
export class ViewRestaurantsComponent implements OnInit{
  groupedRestaurantes: { [ciudad: string]: any[] } = {};
  editandoId: number | null = null;

  formularioEdicion = {
    nombre: '',
    direccion: '',
    ciudad: '',
    capacidad: null
  };

  constructor(private authService: AuthService) {};
  ngOnInit() {
    this.authService.getUser$().subscribe(user => {
       console.log(user?.id);
    if (user?.id) {
      fetch(`http://localhost:3000/restaurants?owner_id=${user.id}`)
        .then(res => res.json())
        .then(data => {
          this.groupedRestaurantes = this.groupByCity(data);
        });
    }
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
  editarRestaurante(r: any) {
  this.editandoId = r.id;
  this.formularioEdicion = {
    nombre: r.nombre,
    direccion: r.direccion,
    ciudad: r.ciudad,
    capacidad: r.capacidad
  };
}
  borrarRestaurante(r: any) {
  const confirmacion = confirm(`¿Estás seguro de que deseas eliminar el restaurante "${r.nombre}"?`);

  if (!confirmacion) return;

  fetch(`http://localhost:3000/restaurants/${r.id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        alert('Restaurante eliminado correctamente ');
        const ciudad = r.ciudad;
        this.groupedRestaurantes[ciudad] = this.groupedRestaurantes[ciudad].filter(
          (rest: any) => rest.id !== r.id
        );

        if (this.groupedRestaurantes[ciudad].length === 0) {
          delete this.groupedRestaurantes[ciudad];
        }
      } else {
        alert('Error al eliminar el restaurante');
      }
    })
    .catch(error => {
      console.error('Error al eliminar:', error);
      alert('Error de conexión con el servidor');
    });
  }
  guardarEdicion(r: any) {
  const id = r.id;

  fetch(`http://localhost:3000/restaurants/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(this.formularioEdicion)
  })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        // alert('Restaurante actualizado correctamente');
        Object.assign(r, this.formularioEdicion);
        this.editandoId = null;

        const allRestaurantes = Object.values(this.groupedRestaurantes).flat();
        this.groupedRestaurantes = this.groupByCity(allRestaurantes);
      } else {
        alert('Error al actualizar el restaurante');
      }
    })
    .catch(error => {
      console.error('Error al guardar la edición:', error);
      alert('Error de conexión con el servidor');
    });
  }
}
