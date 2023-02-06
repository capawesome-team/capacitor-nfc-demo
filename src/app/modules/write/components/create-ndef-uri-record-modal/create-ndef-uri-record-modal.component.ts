import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Constants } from '@app/config';
import { DialogService, NdefRecordsService, NfcHelperService } from '@app/core';
import { UriIdentifierCode } from '@capawesome-team/capacitor-nfc';

@Component({
  selector: 'app-create-ndef-uri-record-modal',
  templateUrl: './create-ndef-uri-record-modal.component.html',
  styleUrls: ['./create-ndef-uri-record-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateNdefUriRecordModalComponent {
  public readonly identifierCode = UriIdentifierCode;

  public uri = '';
  public selectedIdentifierCode: UriIdentifierCode | undefined;

  constructor(
    private readonly dialogService: DialogService,
    private readonly ndefRecordsService: NdefRecordsService,
    private readonly nfcHelperService: NfcHelperService,
  ) {}

  public async closeModal(): Promise<void> {
    await this.dialogService.dismissModal(
      undefined,
      undefined,
      Constants.createNdefUriRecordModalId,
    );
  }

  public async saveAndCloseModal(): Promise<void> {
    const record = this.nfcHelperService.createNdefUriRecord({
      uri: this.uri,
      identifierCode: this.selectedIdentifierCode,
    });
    this.ndefRecordsService.addRecord(record);
    await this.closeModal();
  }
}
