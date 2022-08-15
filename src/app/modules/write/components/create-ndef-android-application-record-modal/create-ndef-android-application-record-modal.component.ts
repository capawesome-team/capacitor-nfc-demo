import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Constants } from '@app/config';
import { DialogService, NdefRecordsService, NfcHelperService } from '@app/core';

@Component({
  selector: 'app-create-ndef-android-application-record-modal',
  templateUrl: './create-ndef-android-application-record-modal.component.html',
  styleUrls: ['./create-ndef-android-application-record-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateNdefAndroidApplicationRecordModalComponent {
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
      Constants.createNdefAndroidApplicationRecordModalId,
    );
  }

  public async saveAndCloseModal(): Promise<void> {
    const record = this.nfcHelperService.createNdefExternalRecord({
      domain: 'android.com',
      type: 'pkg',
      payload: this.payload,
    });
    this.ndefRecordsService.addRecord(record);
    await this.closeModal();
  }
}
