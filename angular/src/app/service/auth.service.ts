import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {

  constructor(
    private router: Router,
    private http  : Http
  ) { }

  logout(){
    sessionStorage.removeItem('Session');
    console.log('Has cerrado sesión');
    this.router.navigate(['login']);
  }

  checkSession(){
    //console.log(sessionStorage.getItem('Session'))
    //console.log(sessionStorage.getItem('carrito'))
    return sessionStorage.getItem('Session');
  }
}
