import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Constants } from '@app/config';
import { DialogService, NdefRecordsService, NfcHelperService } from '@app/core';

@Component({
  selector: 'app-create-ndef-external-record-modal',
  templateUrl: './create-ndef-external-record-modal.component.html',
  styleUrls: ['./create-ndef-external-record-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateNdefExternalRecordModalComponent {
  public domain = '';
  public type = '';
  public payload = '';

  constructor(
    private readonly dialogService: DialogService,
    private readonly ndefRecordsService: NdefRecordsService,
    private readonly nfcHelperService: NfcHelperService,
  ) {}

  public async closeModal(): Promise<void> {
    await this.dialogService.dismissModal(
      undefined,
      undefined,
      Constants.createNdefExternalRecordModalId,
    );
  }

  public async saveAndCloseModal(): Promise<void> {
    const record = this.nfcHelperService.createNdefExternalRecord({
      domain: this.domain,
      type: this.type,
      payload: this.payload,
    });
    this.ndefRecordsService.addRecord(record);
    await this.closeModal();
  }
}
