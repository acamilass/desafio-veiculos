import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { FipeCarsService } from 'src/app/services/fipe-cars.service';
import { map, startWith } from 'rxjs/operators';
import { CommonService } from 'src/app/services/common/common.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  carsModels: any;
  selectedCar: any;

  finalResult: boolean = false;

  brandControl = new FormControl();
  carsByBrandControl = new FormControl();
  carsModelsControl = new FormControl();

  filteredOptions: Observable<[]>;

  constructor(private _fipeCarsService: FipeCarsService, private _commonService: CommonService) { }

  ngOnInit(): void {
    this.getCarsBrands();
  }

  getCarsBrands() {
    this._fipeCarsService.getCarsBrands().subscribe((brands) => {
      this.filteredOptions = this._commonService
        .watchValueChanges(this.brandControl, brands);
    }, (error) => {
      console.error(error);
    });
  }

  getCarsByBrand(id: any) {
    this._fipeCarsService.getCarsByBrand(id).subscribe((carsByBrand) => {
      this.filteredOptions = this._commonService
        .watchValueChanges(this.carsByBrandControl, carsByBrand);
    }, (error) => {
      console.error(error);
    });
  }

  getCarsModels(brandId: number, modelId: string) {
    this._fipeCarsService.getCarsModels(brandId, modelId).subscribe((carsModels) => {
      this.carsModels = carsModels;
    }, (error) => {
      console.error(error);
    });
  }

  getCarsModelsByYear(brandId: number, modelId: string, year: string) {
    this._fipeCarsService.getCarsModelsByYear(brandId, modelId, year).subscribe((selectedCar) => {
      this.selectedCar = selectedCar;
      this.finalResult = true;
    }, (error) => {
      console.error(error);
    });
  }
}
