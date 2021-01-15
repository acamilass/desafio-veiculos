import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { CarsBrands, CarsByBrand, CarsModels, Car } from '../interfaces/fipe-cars.interface';

import { FipeCarsService } from './fipe-cars.service';

describe('FipeCarsService', () => {
  let service: FipeCarsService;
  let httpClientSpy: { get: jasmine.Spy };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientModule ],
    });
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    service = new FipeCarsService(httpClientSpy as any);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call getCarsBrands', () => {
    const expectedReturn: CarsBrands[] = [
      {
        key: 'audi-6', 
        id: 6, 
        fipe_name: 'Audi', 
        name: 'AUDI'
      }
    ];

    httpClientSpy.get.and.returnValue(of(expectedReturn));

    service.getCarsBrands().subscribe((brands) => {
      expect(brands).toEqual(expectedReturn);
    });
  });

  it('should call getCarsByBrand', () => {
    const id = 21;
    const expectedReturn: CarsByBrand[] = [
      {
        key: 'palio-4826', 
        name: 'Palio 1.0 Celebr. ECONOMY F.Flex 8V 4p', 
        id: '4826', 
        fipe_name: 'Palio 1.0 Celebr. ECONOMY F.Flex 8V 4p'
      }
    ];

    httpClientSpy.get.and.returnValue(of(expectedReturn));

    service.getCarsByBrand(id).subscribe((cars) => {
      expect(cars).toEqual(expectedReturn);
    });
  });

  it('should call getCarsModels', () => {
    const brandId = 21;
    const modelId = '4828';
    const expectedReturn: CarsModels[] = [
      {
        fipe_codigo: '32000-1', 
        name: 'Zero KM Gasolina', 
        key: '32000-1', 
        veiculo: 'Palio 1.0 ECONOMY Fire Flex 8V 4p', 
        id: '32000-1'
      }
    ];

    httpClientSpy.get.and.returnValue(of(expectedReturn));

    service.getCarsModels(brandId, modelId).subscribe((carsModels) => {
      expect(carsModels).toEqual(expectedReturn);
    });
  });

  it('should call getCarsModelsByYear', () => {
    const brandId = 21;
    const modelId = '4828';
    const year = '2013-1';
    const expectedReturn: Car[] = [
      {
        id: '2013',
        ano_modelo: '2013',
        marca: 'Fiat',
        name: 'Palio 1.0 ECONOMY Fire Flex 8V 4p',
        veiculo: 'Palio 1.0 ECONOMY Fire Flex 8V 4p',
        preco: 'R$ 23.055,00',
        combustivel: 'Gasolina',
        referencia: 'agosto de 2015',
        fipe_codigo: '001267-0',
        key: 'palio-2013'
      }
    ];

    httpClientSpy.get.and.returnValue(of(expectedReturn));

    service.getCarsModelsByYear(brandId, modelId, year).subscribe((carsModelsByYear) => {
      expect(carsModelsByYear).toEqual(expectedReturn);
    });
  });
});
