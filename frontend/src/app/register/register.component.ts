import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { environment } from '../../environments/environment';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule], 
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  form: any = {
  firstname: '',
  lastname: '',
  email: '',
  password: '',
  confirmPassword: '',
  phone: '',
  role: 'cliente'
  };

  isSignedUp = false;
  isSignUpFailed = false;
  errorMessage = '';

  constructor(){}
  validateEmail(email: string): boolean {
  return /\S+@\S+\.\S+/.test(email);
  }

  validatePassword(password: string): boolean {
    return /[A-Z]/.test(password) && /[^A-Za-z0-9]/.test(password);
  }

  validatePhone(phone: string): boolean {
    return /^\d{9}$/.test(phone); // 9 dígitos exactos
  }

  setError(message: string): void {
    this.isSignUpFailed = true;
    this.errorMessage = message;
  }

  onSubmit() {
  const { email, password, confirmPassword, phone } = this.form;

  if (!email || !password || !confirmPassword || !phone) {
    this.setError('Por favor, completa todos los campos.');
    return;
  }

  if (!this.validateEmail(email)) {
    this.setError('El correo debe tener un formato válido.');
    return;
  }

  if (password !== confirmPassword) {
    this.setError('Las contraseñas no coinciden.');
    return;
  }

  if (!this.validatePassword(password)) {
    this.setError('La contraseña debe contener al menos una mayúscula y un carácter especial.');
    return;
  }

  if (!this.validatePhone(phone)) {
    this.setError('El teléfono debe tener exactamente 9 dígitos.');
    return;
  }

    // 🔁 Convertimos los datos al formato esperado por el backend
  const userPayload = {
    firstname: this.form.firstname,
    lastname: this.form.lastname,
    email: this.form.email,
    password: this.form.password,
    telefono: this.form.phone, // <-- ✅ Aquí cambiamos "phone" por "telefono"
    role: this.form.role
  };

  // Si todo está bien, enviamos la solicitud
  fetch(`${environment.apiUrl}/users`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userPayload)
  })
  .then(response => {
    if (!response.ok) throw new Error('Error al registrar usuario');
    return response.json();
  })
  .then(data => {
    console.log('User successfully registered:', data);
    this.isSignedUp = true;
    this.isSignUpFailed = false;
  })
  .catch(error => {
    console.error('Error registering user:', error);
    this.setError('Error al conectar con el servidor.');
  });
}
  
}
