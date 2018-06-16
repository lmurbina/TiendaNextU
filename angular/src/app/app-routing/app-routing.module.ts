import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from '../component/login/login.component';
import { DashboardComponent } from '../component/dashboard/dashboard.component';
import { CatalogoComponent } from '../component/catalogo/catalogo.component';
import { MenubarComponent } from '../component/menubar/menubar.component';
import { DetalleItemComponent } from '../component/detalle-item/detalle-item.component';
import { CarritoComponent } from '../component/carrito/carrito.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: 'dashboard', component: DashboardComponent,
    children: [
      { path: '', redirectTo: 'catalogo', pathMatch: 'full'},
      { path: 'catalogo', component: CatalogoComponent },
      { path: 'menubar', component: MenubarComponent },
      { path: 'detalleitem', component: DetalleItemComponent},
      { path: 'carrito', component: CarritoComponent}
    ]
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})

export class AppRoutingModule { }
