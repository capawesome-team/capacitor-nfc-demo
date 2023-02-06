import { Pipe, PipeTransform } from '@angular/core';
import { NfcUtils } from '@capawesome-team/capacitor-nfc';

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
    const { bytes } = new NfcUtils().convertHexToBytes({
      hex,
      start,
      separator,
    });
    return bytes;
  }
}
