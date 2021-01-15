import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor() { }

  watchValueChanges(control: FormControl, arrayInfo: any) {
    return control.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filterResults(arrayInfo, value))
      );
  }

  private _filterResults(arrayInfo, value) {
    return arrayInfo.filter(option => option.name.toLowerCase().includes(value));
  }
}
