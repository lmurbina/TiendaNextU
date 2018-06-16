import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { TiendaDataService } from '../../service/tienda-data.service';
import { articulo } from '../../clases/articulo';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { FiltroPipe } from '../../filtro.pipe';
import { forEach } from '@angular/router/src/utils/collection';
import { CarShopingService } from '../../service/car-shoping.service';

@Component({
  selector: 't-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.css']
})
export class CatalogoComponent implements OnInit {

  formulario     : FormGroup;
  listaProductos : articulo[];
  public session : string;
  Cantidad;

  constructor(
    private auth      : AuthService,
    private router    : Router,
    private data      : TiendaDataService,
    private csservice : CarShopingService
  ) { }

  ngOnInit() {
    if (!this.auth.checkSession()) this.router.navigate(['login'])
    this.session = sessionStorage.getItem('Carrito')
    this.mostrarProductos()    
  }

  mostrarProductos(){    
    //this.listaProductos = this.data.getProductos();
    this.data.obtenerProductos().subscribe(()=>{
      this.listaProductos = this.data.productos;
      this.csservice.setArticulos(this.listaProductos);
    }, error =>{
      console.log(error);
    })
  }

  //================Filtrar Productos============================================
  filtrarCatalogo(filtro:string){
    // Hacemos que nuestra lista de productos este completa siempre
    this.listaProductos = this.data.productos
    let productoCatalog = this.listaProductos;
    let itemMatch : articulo[] = [];
    if (filtro != ''){  // Si existe algo que buscar
      for (let item of productoCatalog){
        if (item.nombre.toLowerCase().includes(filtro.toLowerCase()))itemMatch.push(item)        
      }
      // Si encontro alguna coincidencia actualizamos la lista de productos
      if (itemMatch != []) this.listaProductos = itemMatch
    }    
  }
  /*****************************     ******************************/
  verMas(articulo){
    this.csservice.setItem(articulo);
    this.router.navigate(['dashboard/detalleitem'])
  }

  addCanasta(articulo, cantidad){
    if(cantidad != 0){
      this.csservice.setItem(articulo);
      this.csservice.agregarItemShoping(cantidad);
      //console.log(cantidad);
    }

  }

}
