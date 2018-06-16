import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';
import { CarShopingService } from '../../service/car-shoping.service';

@Component({
  selector: 't-detalle-item',
  templateUrl: './detalle-item.component.html',
  styleUrls: ['./detalle-item.component.css']
})
export class DetalleItemComponent implements OnInit {

  articulo : any = {};
  constructor(
    private auth      : AuthService,
    private router    : Router,
    private csservice : CarShopingService
  ) { }

  ngOnInit() {
    if (!this.auth.checkSession()) this.router.navigate(['login'])
    this.articulo = this.csservice.getItem();
  }

  volver(){
    this.articulo = {};
    this.router.navigate(['dashboard']);
  }
}
