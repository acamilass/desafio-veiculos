import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FipeCarsService } from 'src/app/services/fipe-cars.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  carsBrands: any;
  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;

  constructor(private fipeCarsService: FipeCarsService, private _formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.getCars();

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

  getCars() {
    this.fipeCarsService.getCars().subscribe((res: []) => {
      this.carsBrands = res.slice(0, 18);
      console.log(res);
    }, (err) => {
      console.error(err);
    });
  }

  getCarsByBrand(id: number) {
    this.fipeCarsService.getCarsByBrand(id).subscribe((res) => {
      console.log(res);
    }, (err) => {
      console.log(err);
    });
  }
}
