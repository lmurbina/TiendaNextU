import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 't-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(
    private auth  : AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    if (!this.auth.checkSession()){
      this.router.navigate(['login'])
    }
  }

}
