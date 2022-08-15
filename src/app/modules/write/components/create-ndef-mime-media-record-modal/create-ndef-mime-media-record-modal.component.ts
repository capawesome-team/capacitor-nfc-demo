import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Constants } from '@app/config';
import { DialogService, NdefRecordsService, NfcHelperService } from '@app/core';

@Component({
  selector: 'app-create-ndef-mime-media-record-modal',
  templateUrl: './create-ndef-mime-media-record-modal.component.html',
  styleUrls: ['./create-ndef-mime-media-record-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateNdefMimeMediaRecordModalComponent {
  public mimeType = '';
  public mimeData = '';

  constructor(
    private readonly dialogService: DialogService,
    private readonly ndefRecordsService: NdefRecordsService,
    private readonly nfcHelperService: NfcHelperService,
  ) {}

  public async closeModal(): Promise<void> {
    await this.dialogService.dismissModal(
      undefined,
      undefined,
      Constants.createNdefMimeMediaRecordModalId,
    );
  }

  public async saveAndCloseModal(): Promise<void> {
    const record = this.nfcHelperService.createNdefMimeMediaRecord({
      mimeType: this.mimeType,
      mimeData: this.mimeData,
    });
    this.ndefRecordsService.addRecord(record);
    await this.closeModal();
  }
}
