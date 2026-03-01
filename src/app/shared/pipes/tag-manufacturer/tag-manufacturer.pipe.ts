import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  standalone: false,
  name: 'tagManufacturer',
})
export class TagManufacturerPipe implements PipeTransform {
  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }
}
