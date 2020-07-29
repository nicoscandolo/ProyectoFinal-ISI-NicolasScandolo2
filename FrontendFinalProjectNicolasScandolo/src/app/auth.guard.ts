import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router
    ) {}

  canActivate(): boolean {
    // Validar acceso con token, caso contrario enviar a SignIn
    if (this.authService.loggedIn()) {
      return true;
    }
    this.router.navigate(['/signin']);
    return false;
  }
  }

