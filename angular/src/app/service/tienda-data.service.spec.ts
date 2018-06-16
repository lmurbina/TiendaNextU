/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TiendaDataService } from './tienda-data.service';

describe('TiendaDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TiendaDataService]
    });
  });

  it('should ...', inject([TiendaDataService], (service: TiendaDataService) => {
    expect(service).toBeTruthy();
  }));
});
