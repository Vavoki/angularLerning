import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService,
              private router: Router,
              ) {}
  canActivate(): boolean {
  if (!this.authService.isAuth()) {
      this.router.navigate(['singin']);
      return false;
      }
  return true;
  }
}
