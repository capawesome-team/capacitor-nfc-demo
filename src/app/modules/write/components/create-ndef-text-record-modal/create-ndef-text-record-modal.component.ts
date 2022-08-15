import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Constants } from '@app/config';
import { DialogService, NdefRecordsService, NfcHelperService } from '@app/core';

@Component({
  selector: 'app-create-ndef-text-record-modal',
  templateUrl: './create-ndef-text-record-modal.component.html',
  styleUrls: ['./create-ndef-text-record-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateNdefTextRecordModalComponent {
  public text = '';
  public language = 'en';

  constructor(
    private readonly dialogService: DialogService,
    private readonly ndefRecordsService: NdefRecordsService,
    private readonly nfcHelperService: NfcHelperService,
  ) {}

  public async closeModal(): Promise<void> {
    await this.dialogService.dismissModal(
      undefined,
      undefined,
      Constants.createNdefTextRecordModalId,
    );
  }

  public async saveAndCloseModal(): Promise<void> {
    const record = this.nfcHelperService.createTextRecord({
      text: this.text,
      language: this.language,
    });
    this.ndefRecordsService.addRecord(record);
    await this.closeModal();
  }
}
