import { Injectable } from '@angular/core';
import {
  CreateNdefAbsoluteUriRecordOptions,
  CreateNdefExternalRecordOptions,
  CreateNdefMimeMediaRecordOptions,
  CreateNdefTextRecordOptions,
  CreateNdefUriRecordOptions,
  NdefRecord,
  NfcUtils,
  RecordTypeDefinition,
  UriIdentifierCode,
} from '@capawesome-team/capacitor-nfc';

@Injectable({
  providedIn: 'root',
})
export class NfcHelperService {
  private readonly nfcUtilsInstance = new NfcUtils();

  constructor() {}

  public convertStringToBytes(text: string): number[] {
    return this.nfcUtilsInstance.convertStringToBytes({ text }).bytes;
  }

  public convertBytesToString(bytes: number[]): string {
    return this.nfcUtilsInstance.convertBytesToString({ bytes }).text;
  }

  public createNdefEmptyRecord(): NdefRecord {
    const { record } = this.nfcUtilsInstance.createNdefEmptyRecord();
    return record;
  }

  public createTextRecord(options: CreateNdefTextRecordOptions): NdefRecord {
    const { record } = this.nfcUtilsInstance.createNdefTextRecord(options);
    return record;
  }

  public createNdefUriRecord(options: CreateNdefUriRecordOptions): NdefRecord {
    const { record } = this.nfcUtilsInstance.createNdefUriRecord(options);
    return record;
  }

  public createNdefAbsoluteUriRecord(
    options: CreateNdefAbsoluteUriRecordOptions,
  ): NdefRecord {
    const { record } =
      this.nfcUtilsInstance.createNdefAbsoluteUriRecord(options);
    return record;
  }

  public createNdefMimeMediaRecord(
    options: CreateNdefMimeMediaRecordOptions,
  ): NdefRecord {
    const { record } = this.nfcUtilsInstance.createNdefMimeMediaRecord(options);
    return record;
  }

  public createNdefExternalRecord(
    options: CreateNdefExternalRecordOptions,
  ): NdefRecord {
    const { record } = this.nfcUtilsInstance.createNdefExternalRecord(options);
    return record;
  }

  public getIdentifierCodeFromNdefUriRecord(
    record: NdefRecord,
  ): UriIdentifierCode | undefined {
    const { identifierCode } =
      this.nfcUtilsInstance.getIdentifierCodeFromNdefUriRecord({
        record,
      });
    return identifierCode;
  }

  public getLanguageFromNdefTextRecord(record: NdefRecord): string | undefined {
    const { language } = this.nfcUtilsInstance.getLanguageFromNdefTextRecord({
      record,
    });
    return language;
  }

  public getTextFromNdefTextRecord(record: NdefRecord): string | undefined {
    const { text } = this.nfcUtilsInstance.getTextFromNdefTextRecord({
      record,
    });
    return text;
  }

  public getUriFromNdefUriRecord(record: NdefRecord): string | undefined {
    const { uri } = this.nfcUtilsInstance.getUriFromNdefUriRecord({
      record,
    });
    return uri;
  }

  public mapBytesToRecordTypeDefinition(options: {
    bytes: number[];
  }): RecordTypeDefinition | undefined {
    return this.nfcUtilsInstance.mapBytesToRecordTypeDefinition(options).type;
  }

  public mapUriIdentifierCodeToText(identifierCode: UriIdentifierCode): string {
    switch (identifierCode) {
      case UriIdentifierCode.HttpWww:
        return 'http://www.';
      case UriIdentifierCode.HttpsWww:
        return 'https://www.';
      case UriIdentifierCode.Http:
        return 'http://';
      case UriIdentifierCode.Https:
        return 'https://';
      default:
        return '';
    }
  }
}
