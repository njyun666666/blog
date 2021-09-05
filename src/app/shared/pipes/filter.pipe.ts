import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(array: any[], field: string, value: any): any[] {

    // console.log(array);
    // console.log(field, value);

    if (!Array.isArray(array)) {
      return [];
    }

    if (value == undefined || value == null) {
      return array;
    }

    return array.filter(x => x[field] === value);
  }

}
