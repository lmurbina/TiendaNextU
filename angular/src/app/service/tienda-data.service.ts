import { Injectable } from '@angular/core';
import { DatabaseService } from './database.service';
import { Response, Http } from '@angular/http';
import { Usuario } from '../clases/usuarios';
import { articulo } from '../clases/articulo';
import { CANCELLED } from 'dns';

@Injectable()
export class TiendaDataService {

  user      : Usuario[];
  public productos : articulo[];
  public productoCatalog: articulo[];
  url : string;
  
  constructor(private db: DatabaseService, private http: Http) { 
    this.url = 'https://tienda-on.firebaseio.com/productos.json';
  }

  public initData(){
    this.db.getUsuarios().subscribe((data) => this.user = data) 
    this.db.getProductos().subscribe((data) => this.productos = data)
  }

  public obtenerProductos(){
    return this.http.get(this.url).map(res => {
        this.productos = res.json();
      })
  }

  public getProductos(): articulo[]{
    return this.productos;
  }

  public actualizarProducto(id: number, cantidad: number){    
    let url = `https://tienda-on.firebaseio.com/productos/${id}/disponible.json`;
    return this.http.put(url, cantidad);      
  }

}
