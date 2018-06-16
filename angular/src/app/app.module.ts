import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AngularFireModule } from 'angularfire2';

import { AppComponent } from './app.component';
import { LoginComponent } from './component/login/login.component';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { DatabaseService } from './service/database.service';
import { TiendaDataService } from './service/tienda-data.service';
import { MenubarComponent } from './component/menubar/menubar.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { CatalogoComponent } from './component/catalogo/catalogo.component';
import { AuthService } from './service/auth.service';
import { CarShopingService } from './service/car-shoping.service';
import { DetalleItemComponent } from './component/detalle-item/detalle-item.component';
import { CarritoComponent } from './component/carrito/carrito.component';


export const firebaseConfig = {
  apiKey: "AIzaSyBkwgbPbJcohy436DPJwqU9P0iQKuPJsRQ",
  authDomain: "tienda-on.firebaseapp.com",
  databaseURL: "https://tienda-on.firebaseio.com",
  projectId: "tienda-on",
  storageBucket: "tienda-on.appspot.com",
  messagingSenderId: "270214453763"
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MenubarComponent,
    DashboardComponent,
    CatalogoComponent,
    DetalleItemComponent,
    CarritoComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AngularFireModule.initializeApp(firebaseConfig),
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [
    DatabaseService, 
    TiendaDataService,
    AuthService,
    CarShopingService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
