import { Pipe, PipeTransform } from '@angular/core';
import { NfcHelperService } from '@app/core';
import {
  NdefRecord,
  RecordTypeDefinition,
  TypeNameFormat,
} from '@capawesome-team/capacitor-nfc';

@Pipe({
  name: 'recordLabel',
})
export class RecordLabelPipe implements PipeTransform {
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
      case RecordTypeDefinition.AndroidApp:
        return 'Android App';
      case RecordTypeDefinition.AlternativeCarrier:
        return 'Alternative Carrier';
      case RecordTypeDefinition.HandoverCarrier:
        return 'Handover Carrier';
      case RecordTypeDefinition.HandoverRequest:
        return 'Handover Request';
      case RecordTypeDefinition.HandoverSelect:
        return 'Handover Select';
      case RecordTypeDefinition.SmartPoster:
        return 'Smart Poster';
      case RecordTypeDefinition.Text: {
        const language =
          this.nfcHelperService.getLanguageFromNdefTextRecord(record);
        return language ? `Text (${language})` : 'Text';
      }
      case RecordTypeDefinition.Uri:
        return 'Uri';
      default:
        switch (record.tnf) {
          case TypeNameFormat.Empty:
            return 'Empty';
          case TypeNameFormat.AbsoluteUri:
            return 'Absolute Uri';
          case TypeNameFormat.MimeMedia: {
            const type = this.nfcHelperService.convertBytesToString(
              record.type,
            );
            return type ? `MIME type (${type})` : 'MIME type';
          }
          case TypeNameFormat.External: {
            const type = this.nfcHelperService.convertBytesToString(
              record.type,
            );
            return type ? `External (${type})` : 'External';
          }
          default:
            return '';
        }
    }
  }
}
