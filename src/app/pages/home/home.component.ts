import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { FipeCarsService } from 'src/app/services/fipe-cars.service';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  carsBrands: any;
  carsByBrand: any;
  carsModels: any;
  selectedCar: any;

  finalResult: boolean = false;

  brandControl = new FormControl();
  carsByBrandControl = new FormControl();
  carsModelsControl = new FormControl();

  filteredOptions: Observable<[]>;

  constructor(private fipeCarsService: FipeCarsService, private _formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.getCarsBrands();
  }

  getCarsBrands() {
    this.fipeCarsService.getCarsBrands().subscribe((brands) => {
      this.carsBrands = brands;
      
      this.filteredOptions = this.brandControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filterBrands(value))
      );
    }, (error) => {
      console.error(error);
    });
  }

  getCarsByBrand(id: any) {
    this.fipeCarsService.getCarsByBrand(id).subscribe((carsByBrand) => {
      this.carsByBrand = carsByBrand;

      this.filteredOptions = this.carsByBrandControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filterCarsByBrand(value))
      );
    }, (error) => {
      console.error(error);
    });
  }

  getCarsModels(brandId: number, modelId: string) {
    this.fipeCarsService.getCarsModels(brandId, modelId).subscribe((carsModels) => {
      this.carsModels = carsModels;
    }, (error) => {
      console.error(error);
    });
  }

  getCarsModelsByYear(brandId: number, modelId: string, year: string) {
    this.fipeCarsService.getCarsModelsByYear(brandId, modelId, year).subscribe((selectedCar) => {
      this.selectedCar = selectedCar;
      this.finalResult = true;
    }, (error) => {
      console.error(error);
    });
  }

  private _filterBrands(value: any): [] {
    return this.carsBrands.filter(option => option.name.toLowerCase().includes(value));
  }

  private _filterCarsByBrand(value: any): [] {
    return this.carsByBrand.filter(option => option.name.toLowerCase().includes(value));
  }
}
