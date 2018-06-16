import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { CarShopingService } from '../../service/car-shoping.service';

@Component({
  selector: 't-menubar',
  templateUrl: './menubar.component.html',
  styleUrls: ['./menubar.component.css']
})
export class MenubarComponent implements OnInit {
  carShoping : any[] = [];
  constructor(
    private auth: AuthService,
    private csservice : CarShopingService
  ) { }

  ngOnInit() {
    this.carShoping = this.csservice.getCarShoping();
    console.log(this.carShoping)
  }

  cerrarSesion(){
    this.auth.logout();
  }
}
