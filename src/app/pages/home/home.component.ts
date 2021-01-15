import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { FipeCarsService } from 'src/app/services/fipe-cars.service';
import { CommonService } from 'src/app/services/common/common.service';
import { Car, CarsBrands, CarsByBrand, CarsModels } from 'src/app/interfaces/fipe-cars.interface';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  carsModels: CarsModels;
  selectedCar: Car;

  finalResult: boolean = false;

  brandControl = new FormControl();
  carsByBrandControl = new FormControl();
  carsModelsControl = new FormControl();

  filteredOptions: Observable<[]>;

  constructor(private _fipeCarsService: FipeCarsService, 
    private _commonService: CommonService) 
  { }

  ngOnInit(): void {
    this.getCarsBrands();
  }

  getCarsBrands() {
    this._fipeCarsService.getCarsBrands().subscribe((brands: CarsBrands) => {
      this.filteredOptions = this._commonService
        .watchValueChanges(this.brandControl, brands);
    }, (error: HttpErrorResponse) => {
      console.error(error);
    });
  }

  getCarsByBrand(id: number) {
    this._fipeCarsService.getCarsByBrand(id).subscribe((carsByBrand: CarsByBrand) => {
      this.filteredOptions = this._commonService
        .watchValueChanges(this.carsByBrandControl, carsByBrand);
    }, (error: HttpErrorResponse) => {
      console.error(error);
    });
  }

  getCarsModels(brandId: number, modelId: string) {
    this._fipeCarsService.getCarsModels(brandId, modelId).subscribe((carsModels: CarsModels) => {
      this.carsModels = carsModels;
    }, (error: HttpErrorResponse) => {
      console.error(error);
    });
  }

  getCarsModelsByYear(brandId: number, modelId: string, year: string) {
    this._fipeCarsService.getCarsModelsByYear(brandId, modelId, year).subscribe((selectedCar: Car) => {
      this.selectedCar = selectedCar;
      this.finalResult = true;
    }, (error: HttpErrorResponse) => {
      console.error(error);
    });
  }
}
