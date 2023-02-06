/* eslint-disable no-bitwise */
import { Pipe, PipeTransform } from '@angular/core';
import { NfcUtils } from '@capawesome-team/capacitor-nfc';

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
    const { hex } = new NfcUtils().convertBytesToHex({
      bytes,
      start,
      separator,
    });
    return hex;
  }
}
