import { Component, OnInit } from '@angular/core';
import { CarShopingService } from '../../service/car-shoping.service';
import { AuthService } from '../../service/auth.service';
import { TiendaDataService } from '../../service/tienda-data.service';
import { Router } from '@angular/router';
import { runInThisContext } from 'vm';
import { CatalogoComponent } from '../catalogo/catalogo.component';

@Component({
  selector: 't-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css'],
  providers: [CatalogoComponent]
})

export class CarritoComponent implements OnInit {

  carItems : any[] = [];
  total    = 0;
  loading  = false;
  error    : string;
  constructor(
    private csservice: CarShopingService,
    private auth     : AuthService,
    private data     : TiendaDataService,
    private router   : Router,
    private catalogo : CatalogoComponent
  ) { }
  

  ngOnInit() {
    if (!this.auth.checkSession()) this.router.navigate(['login'])
    this.cargarCarrito();
  }
  private cargarCarrito(){
    this.carItems = this.csservice.getCarShoping()
    this.total = 0;
    if (this.carItems.length == 0)
      this.error=`No ha agregado ningun producto. Lo invitamos a dar un pase por nuestra <a href='#'>Tienda Virtual</a>`;
    for(var i = 0; i < this.carItems.length; i++)
      this.total += this.carItems[i].item.precio * this.carItems[i].cantidad;
  }

  //================================================================//
  pagar(){
    this.loading = true;
    let productos : any[] = this.data.productos;
    console.log(this.carItems)
    for (let i of this.carItems){
      let disponible;
      productos.filter((p) => {
        if(p.id == i.item.id){          
          disponible = p.disponible
          console.log(p.id+', '+i.item.id+', '+disponible)
        }
      })
      this.data.actualizarProducto(i.item.id - 1, disponible).subscribe(()=>{
        console.log('Se actualizo el disponible de '+ i.item.nombre)
        this.total = 0;
        this.csservice.eliminarDeCarrito(i.item.id);        
      }) 
    }
    this.csservice.vaciarCarrito();
    this.catalogo.mostrarProductos();
    this.router.navigate(['dashboard']);
  }
  //==================================================================//
  private vaciar(){
    for( let i of this.carItems) {
      this.csservice.updateCantidad(i.id, i.cantidad, true);
    }
    this.total = 0;
    this.csservice.vaciarCarrito();
    this.router.navigate(['dashboard']);
  }
  //===================================================================//
  private quitarItem(id){
    this.csservice.eliminarDeCarrito(id);
    this.cargarCarrito(); // Queria ver si me actualiza el total
    console.log(this.carItems); // Aqui esta bien 
  }
}


/*if(error) res.status(200).jsonp({updateMsg:error});
		else res.status(200).jsonp({updateMsg:"Ok"});*/