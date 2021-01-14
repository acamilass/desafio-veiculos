import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
import { FipeCarsService } from 'src/app/services/fipe-cars.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  carsBrands: any;

  constructor(private fipeCarsService: FipeCarsService) { }

  ngOnInit(): void {
    this.getCars();
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
