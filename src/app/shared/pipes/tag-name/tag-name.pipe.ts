import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tagName',
})
export class TagNamePipe implements PipeTransform {
  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }
}
