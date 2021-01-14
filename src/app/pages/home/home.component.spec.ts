import { HttpClientModule } from '@angular/common/http';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { of } from 'rxjs';
import { FipeCarsService } from 'src/app/services/fipe-cars.service';

import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let service: FipeCarsService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeComponent ],
      imports: [ 
        HttpClientModule,
        MatAutocompleteModule 
      ],
      providers: [
        FormBuilder
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(FipeCarsService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getCarsBrands', () => {
    spyOn(service, 'getCarsBrands').and.returnValue(of({}));
    component.getCarsBrands();
    expect(component).toBeTruthy();
  });

  it('should call getCarsByBrand', () => {
    const id = 6;
    spyOn(service, 'getCarsByBrand').and.returnValue(of({}));
    component.getCarsByBrand(id);
    expect(component).toBeTruthy();
  });

  it('should call getCarsModels', () => {
    const brandId = 6;
    const modelId = '333';
    spyOn(service, 'getCarsModels').and.returnValue(of({}));
    component.getCarsModels(brandId, modelId)
    expect(component).toBeTruthy();
  });

  it('should call getCarsModelsByYear', () => {
    const brandId = 6;
    const modelId = '333';
    const year = '2013-1';
    spyOn(service, 'getCarsModelsByYear').and.returnValue(of({}));
    component.getCarsModelsByYear(brandId, modelId, year);
    expect(component).toBeTruthy();
  });
});
