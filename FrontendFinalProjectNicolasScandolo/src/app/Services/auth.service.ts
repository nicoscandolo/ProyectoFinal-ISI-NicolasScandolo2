import { Injectable } from '@angular/core';
import { Usuario } from '../Models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  formData: Usuario;
  readonly rootURL = 'http://localhost:5000/api/';
  constructor(private http: HttpClient, private router: Router) { }


  signUp(formData: Usuario) {
    // se puede mejorar poniendo interfaz para el tipo de dato de usuario
    return this.http.post<any>(this.rootURL + '/signup', formData);
  }

  signIn(formData: Usuario) {
    return this.http.post<any>(this.rootURL + '/signin', formData);
  }

  loggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  logOut() {
    localStorage.removeItem('token');
    this.router.navigate(['/signin']);
  }

  getToken() {
    return localStorage.getItem('token');
  }

}
