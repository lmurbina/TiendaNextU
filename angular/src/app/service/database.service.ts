import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/Rx';
//import { Usuario } from '../clases/usuarios';

@Injectable()
export class DatabaseService {

  constructor(private http: Http) { }

  getUsuarios(){
    return this.http.get('https://tienda-on.firebaseio.com/usuarios.json')
      .map((response: Response) => response.json()) 
  }
  getProductos(){
    return this.http.get('https://tienda-on.firebaseio.com/productos.json')
      .map((response: Response) => response.json())
  }
}
