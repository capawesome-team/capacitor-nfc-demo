import { Pipe, PipeTransform } from '@angular/core';
import { NfcHelperService } from '@app/core';
import {
  NdefRecord,
  RecordTypeDefinition,
  TypeNameFormat,
  UriIdentifierCode,
} from '@capawesome-team/capacitor-nfc';

@Pipe({
  name: 'recordPayload',
})
export class RecordPayloadPipe implements PipeTransform {
  constructor(private readonly nfcHelperService: NfcHelperService) {}

  transform(record: NdefRecord | undefined): string {
    if (!record || !record.type || !record.payload) {
      return '';
    }
    const recordTypeDefinition =
      this.nfcHelperService.mapBytesToRecordTypeDefinition({
        bytes: record.type,
      });
    switch (recordTypeDefinition) {
      case RecordTypeDefinition.Text:
        return this.nfcHelperService.getTextFromNdefTextRecord(record) || '';
      case RecordTypeDefinition.Uri: {
        const identifierCode =
          this.nfcHelperService.getIdentifierCodeFromNdefUriRecord(record) ||
          UriIdentifierCode.None;
        const uri = this.nfcHelperService.getUriFromNdefUriRecord(record) || '';
        return (
          this.nfcHelperService.mapUriIdentifierCodeToText(identifierCode) + uri
        );
      }
      default:
        switch (record.tnf) {
          case TypeNameFormat.AbsoluteUri:
            return this.nfcHelperService.convertBytesToString(record.type);
          default:
            return this.nfcHelperService.convertBytesToString(record.payload);
        }
    }
  }
}
