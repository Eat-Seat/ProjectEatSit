import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

// Interfaz para tipar al usuario
export interface User {
  id: number;
  email: string;
  firstname: string;
  lastname: string;
  role: 'cliente' | 'restaurante';
  telefono: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userSubject = new BehaviorSubject<User | null>(null);
  private authoritySubject = new BehaviorSubject<string | null>(null);

  constructor() {
    // Recuperar datos del almacenamiento local si existen
    const savedUser = localStorage.getItem('user');
    const savedAuthority = localStorage.getItem('authority');

    if (savedUser) {
      const user: User = JSON.parse(savedUser);
      this.userSubject.next(user);
    }

    if (savedAuthority) {
      this.authoritySubject.next(savedAuthority);
    }
  }

  setUser(user: User): void {
    this.userSubject.next(user);
    localStorage.setItem('user', JSON.stringify(user));
    this.setAuthority(user.role); 
    console.log(user);
  }

  getUser$() {
    return this.userSubject.asObservable();
  }

  getUser(): User | null {
    return this.userSubject.value;
  }

  // Guardar solo el rol (authority)
  setAuthority(role: string): void {
    this.authoritySubject.next(role);
    localStorage.setItem('authority', role);
  }

  getAuthority$() {
    return this.authoritySubject.asObservable();
  }

  getAuthority(): string | null {
    return this.authoritySubject.value;
  }

  logout(): void {
    this.userSubject.next(null);
    this.authoritySubject.next(null);
    localStorage.removeItem('user');
    localStorage.removeItem('authority');
  }
}
