/* eslint-disable no-bitwise */
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'booleanToText',
})
export class BooleanToTextPipe implements PipeTransform {
  transform(value: boolean): string {
    if (value) {
      return 'Yes';
    }
    return 'No';
  }
}
