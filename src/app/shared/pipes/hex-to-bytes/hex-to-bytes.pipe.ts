import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'hexToBytes',
})
export class HexToBytesPipe implements PipeTransform {
  transform(
    hex: string,
    start: string = '0x',
    separator: string = '',
  ): number[] {
    if (!hex || typeof hex !== 'string') {
      return [];
    }
    hex = hex.replace(start, '');
    hex = hex.split(separator).join('');
    const bytes: number[] = [];
    for (let i = 0; i < hex.length; i += 2) {
      bytes.push(parseInt(hex.substr(i, 2), 16));
    }
    return bytes;
  }
}
