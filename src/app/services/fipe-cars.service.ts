import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FipeCarsService {

  constructor(private http: HttpClient) { }

  getCars() {
    return this.http.get('https://fipeapi.appspot.com/api/1/carros/marcas.json');
  }

  getCarsByBrand(id: number) {
    return this.http.get(`https://fipeapi.appspot.com/api/1/carros/veiculos/${id}.json`)
  }
}
