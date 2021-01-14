import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const URL = 'https://fipeapi.appspot.com/api/1/carros';

@Injectable({
  providedIn: 'root'
})
export class FipeCarsService {

  constructor(private http: HttpClient) { }

  getCarsBrands() {
    return this.http.get(`${URL}/marcas.json`);
  }

  getCarsByBrand(id: number) {
    return this.http.get(`${URL}/veiculos/${id}.json`)
  }

  getCarsModels(brandId: number, modelId: string) {
    return this.http.get(`${URL}/veiculo/${brandId}/${modelId}.json`);
  }

  getCarsModelsByYear(brandId: number, modelId: string, year: string) {
    return this.http.get(`${URL}/veiculo/${brandId}/${modelId}/${year}.json`)
  }
}
