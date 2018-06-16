import { Component } from '@angular/core';
import { TiendaDataService } from './service/tienda-data.service';

@Component({
  selector: 't-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor (private data: TiendaDataService){
    data.initData()
  }
  title = 't works!';
}
