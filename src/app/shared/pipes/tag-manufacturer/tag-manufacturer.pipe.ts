import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tagManufacturer',
})
export class TagManufacturerPipe implements PipeTransform {
  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }
}
