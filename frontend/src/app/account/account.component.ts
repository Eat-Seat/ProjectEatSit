import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService, User }from '../services/authservice.service';


@Component({
  selector: 'app-account',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './account.component.html',
  styleUrl: './account.component.css'
})
export class AccountComponent implements OnInit {
  user: User | null = null;
  editMode = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.user = this.authService.getUser();
    console.log({user: this.user});
  }

  toggleEdit(): void {
    this.editMode = !this.editMode;
  }

  saveChanges(): void {
    this.editMode = false;
    if (!this.user || !this.user.id) {
      console.error("No hay usuario autenticado o falta el ID.");
      return;
    }
  
    const updatedUser = {
      firstname: this.user.firstname,
      lastname: this.user.lastname,
      telefono: this.user.telefono,
      email: this.user.email,
      password: this.user.password
    };
  
    fetch(`http://localhost:3000/users/${this.user.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedUser)
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        console.log('Usuario actualizado correctamente');
        this.authService.setUser(this.user!); 
        this.editMode = false;
      } else {
        console.error('Error al actualizar:', data.message);
        alert('Error: ' + data.message);
      }
    })
    .catch(error => {
      console.error('Error en la solicitud:', error);
      alert('Error en la conexión con el servidor');
    });
  }
  

  deleteAccount(): void {
    if (confirm('¿Estás seguro de que deseas eliminar tu cuenta? Esta acción no se puede deshacer.')) {
      this.authService.logout();
      // Aquí podrías llamar también a un backend si estás conectado
      alert('Cuenta eliminada correctamente.');
      this.router.navigate(['/login']);
    }
  }
}
