import { Component, OnInit } from '@angular/core';
//import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { FormGroup, FormControl, Validators } from '@angular/forms';
//import { validateConfig } from '@angular/router/src/config';
import { TiendaDataService } from '../../service/tienda-data.service';
import { Usuario } from '../../clases/usuarios';
import { Router, ActivatedRoute } from '@angular/router';
/*import { Http, Response } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from "rxjs/Rx"*/

@Component({
  selector: 't-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email    : string;
  password : string;
  loginForm: FormGroup;
  mensaje  : string;
  usuarios : Usuario[];
  //user     : Observable<any>;

  constructor(private data: TiendaDataService, private router: Router) {
    /*this.user = this.http.get('https://tienda-on.firebaseio.com/usuarios.json')
    .map((response: Response) => response.json())
    this.user.subscribe((data)=>{
      this.usuarios=data
      console.log(this.usuarios);  // PORQUE AQUI SI LA IMPRIME
    }); */
  }

  ngOnInit() {
    this.email     = '';
    this.password  = '';
    this.loginForm = new FormGroup({
      'email'    : new FormControl('', Validators.required),
      'password' : new FormControl('', Validators.required)
    })
    
  }

  checkLogin(){
    this.usuarios = this.data.user;
    if (this.loginForm.valid){   
      this.email    = this.loginForm.value.email.toLowerCase()//.replace(/[^a-zA-Z 0-9.]+/g,'').replace(/\./g,'');
      this.password = this.loginForm.value.password;
      let login = {} = this.getuser(this.usuarios, this.email);      
      if (login != {}){
        if (this.password == login.password){
          this.mensaje = 'Iniciando Sesión';
          console.log(this.mensaje);
          sessionStorage.setItem('Session', this.email);
          this.router.navigate(['dashboard']);
        } else this.mensaje = 'Contraseña Incorrecta';
      } else this.mensaje = 'Usuario no existe';
      /*const user = this.db.database.object(`/usuarios/${login}`);
      user.subscribe(data =>{
        if (data.$exists()){
          console.log('Email correcto: '+ data.email);
          if (data.password == this.password){
            this.mensaje = 'Iniciando Sesión';
            //sessionStorage.setItem('Session', this.email);
            //this.router.navigate(['tienda']);
            console.log(this.mensaje);
          } else {
            this.mensaje = 'Contraseña incorrecta';
            console.log(this.mensaje);
          } 

        } else {
          this.mensaje = 'El usuario no existe';
          console.log(this.mensaje);
        }
      })  */
    }
  }

  getuser(usuario, value){
    for(var i=0; i<usuario.length; i++){
      if (usuario[i].email = value)
        return usuario[i];
    }
  }
}
