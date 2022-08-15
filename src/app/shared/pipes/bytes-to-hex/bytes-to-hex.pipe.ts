/* eslint-disable no-bitwise */
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'bytesToHex',
})
export class BytesToHexPipe implements PipeTransform {
  transform(
    bytes: unknown,
    start: string = '0x',
    separator: string = '',
  ): string {
    if (!bytes || !Array.isArray(bytes)) {
      return '';
    }
    const hexArray: string[] = [];
    for (const byte of bytes) {
      const hexItem = ('0' + (byte & 0xff).toString(16))
        .slice(-2)
        .toUpperCase();
      hexArray.push(hexItem);
    }
    return start + hexArray.join(separator);
  }
}
