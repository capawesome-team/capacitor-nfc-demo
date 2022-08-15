/* eslint-disable no-bitwise */
import { Pipe, PipeTransform } from '@angular/core';
import { NfcHelperService } from '@app/core';

@Pipe({
  name: 'bytesToText',
})
export class BytesToTextPipe implements PipeTransform {
  constructor(private readonly nfcHelperService: NfcHelperService) {}

  transform(bytes: unknown): string {
    if (!bytes || !Array.isArray(bytes)) {
      return '';
    }
    return this.nfcHelperService.convertBytesToString(bytes);
  }
}
