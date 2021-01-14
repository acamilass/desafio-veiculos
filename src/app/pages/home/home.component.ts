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

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;

  brandControl = new FormControl();
  carsByBrandControl = new FormControl();
  carsModelsControl = new FormControl();

  filteredOptions: Observable<[]>;

  constructor(private fipeCarsService: FipeCarsService, private _formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.getCarsBrands();

    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['']
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['']
    });
    this.thirdFormGroup = this._formBuilder.group({
      thirdCtrl: ['']
    });

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
    console.log(id);
    this.fipeCarsService.getCarsByBrand(id).subscribe((carsByBrand) => {
      this.carsByBrand = carsByBrand;

      this.filteredOptions = this.carsByBrandControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filterCarsByBrand(value))
      );

      console.log(carsByBrand);
    }, (error) => {
      console.error(error);
    });
  }

  getCarsModels(brandId: number, modelId: string) {
    console.log(brandId, modelId);
    this.fipeCarsService.getCarsModels(brandId, modelId).subscribe((res) => {
      this.carsModels = res;

      this.filteredOptions = this.carsModelsControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filterCarsModels(value))
      );

      console.log(res);
    }, (error) => {
      console.error(error);
    })
  }

  getCarsModelsByYear(brandId: number, modelId: string, year: string) {
    this.fipeCarsService.getCarsModelsByYear(brandId, modelId, year).subscribe((res) => {
      console.log(res);
    }, (error) => {
      console.error(error);
    });
  }

  private _filterBrands(value: string): [] {
    return this.carsBrands.filter(option => option.name.toLowerCase().includes(value));
  }

  private _filterCarsByBrand(value: string): [] {
    return this.carsByBrand.filter(option => option.name.toLowerCase().includes(value));
  }

  private _filterCarsModels(value: string) {
    return this.carsModels.filter(option => option.name.toLowerCase().includes(value));
  }
}
