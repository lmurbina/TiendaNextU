import { Injectable } from '@angular/core';

@Injectable()
export class CarShopingService {

  private item       : any = {};
  private carShoping : any[] = [];
  private articulos  : any[] = [];

  constructor() {
    this.cargarCarrito();
  }

  public cargarCarrito() {
    let sc = JSON.parse(sessionStorage.getItem("carrito"));
    this.carShoping = sc ? sc : [] ;
  }

  setArticulos(articulos){
    this.articulos = articulos;
  }
  getArticulos(){
    return this.articulos;
  }
  setItem(item){    
    this.item = item;
  }
  getItem(){    
    return this.item;
  }
  setCarShoping(){
    do {
      this.carShoping.pop();
    } while (this.carShoping.length > 0);
    sessionStorage.setItem('carrito', JSON.stringify(this.carShoping));
  }
  agregarItemShoping(cant){    
    for (var i=0; i< this.articulos.length; i++){
      if (this.articulos[i].id == this.item.id)
        this.articulos[i].disponible = this.articulos[i].disponible - cant;
    }
    let encontrado = -1;
    for (var j = 0; j < this.carShoping.length; j++) {
      if(this.carShoping[j].item.id == this.item.id)
        encontrado = j;
    }
    if(encontrado != -1)
      this.carShoping[encontrado].cantidad = parseInt(this.carShoping[encontrado].cantidad) + parseInt(cant);
    else this.carShoping.push({item: this.item, cantidad: cant}) 
    sessionStorage.setItem('carrito', JSON.stringify(this.carShoping));  
  }

  public updateCantidad(id, cantidad, aumentar: boolean){
    for (let x in this.articulos){
      this.articulos[x].disponible = aumentar ?
      this.articulos[x].disponible + cantidad :
      this.articulos[x].disponible - cantidad
    }
  }
  public vaciarCarrito(){
    this.carShoping = [];
    sessionStorage.setItem('carrito', JSON.stringify(this.carShoping))
    //console.log(this.carShoping)
  }
  getCarShoping(){
    return this.carShoping;
  }

  public eliminarDeCarrito(id: number) {
    for( let f of this.carShoping ) {
      if( f.item.id == id ) {
        this.carShoping.splice( parseInt(f), 1 );
      }
    }
    sessionStorage.setItem('carrito', JSON.stringify(this.carShoping));
  }
}
