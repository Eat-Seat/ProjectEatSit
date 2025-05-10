import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-restaurants',
  imports: [CommonModule],
  templateUrl: './view-restaurants.component.html',
  styleUrl: './view-restaurants.component.css'
})
export class ViewRestaurantsComponent implements OnInit{
  groupedRestaurantes: { [ciudad: string]: any[] } = {};

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
  editarRestaurante(r: any) {

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

}
