import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Constants } from '@app/config';
import { DialogService, NdefRecordsService, NfcHelperService } from '@app/core';
// eslint-disable-next-line max-len
import { CreateNdefAbsoluteUriRecordModalComponent } from '../create-ndef-absolute-uri-record-modal/create-ndef-absolute-uri-record-modal.component';
// eslint-disable-next-line max-len
import { CreateNdefAndroidApplicationRecordModalComponent } from '../create-ndef-android-application-record-modal/create-ndef-android-application-record-modal.component';
import { CreateNdefExternalRecordModalComponent } from '../create-ndef-external-record-modal/create-ndef-external-record-modal.component';
// eslint-disable-next-line max-len
import { CreateNdefMimeMediaRecordModalComponent } from '../create-ndef-mime-media-record-modal/create-ndef-mime-media-record-modal.component';
import { CreateNdefTextRecordModalComponent } from '../create-ndef-text-record-modal/create-ndef-text-record-modal.component';
import { CreateNdefUriRecordModalComponent } from '../create-ndef-uri-record-modal/create-ndef-uri-record-modal.component';

@Component({
  selector: 'app-create-ndef-record-modal',
  templateUrl: './create-ndef-record-modal.component.html',
  styleUrls: ['./create-ndef-record-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateNdefRecordModalComponent {
  constructor(
    private readonly dialogService: DialogService,
    private readonly nfcHelperService: NfcHelperService,
    private readonly ndefRecordsService: NdefRecordsService,
  ) {}

  public async closeModal(): Promise<void> {
    await this.dialogService.dismissModal(
      undefined,
      undefined,
      Constants.createNdefRecordModalId,
    );
  }

  public async createNdefEmptyRecord(): Promise<void> {
    const record = this.nfcHelperService.createNdefEmptyRecord();
    this.ndefRecordsService.addRecord(record);
    await this.closeModal();
  }

  public async openCreateNdefTextRecordModal(): Promise<void> {
    await this.dialogService.showModal({
      component: CreateNdefTextRecordModalComponent,
      id: Constants.createNdefTextRecordModalId,
      cssClass: 'modal-fullscreen',
    });
    await this.closeModal();
  }

  public async openCreateNdefUriRecordModal(): Promise<void> {
    await this.dialogService.showModal({
      component: CreateNdefUriRecordModalComponent,
      id: Constants.createNdefUriRecordModalId,
      cssClass: 'modal-fullscreen',
    });
    await this.closeModal();
  }

  public async openCreateNdefAbsoluteUriRecordModal(): Promise<void> {
    await this.dialogService.showModal({
      component: CreateNdefAbsoluteUriRecordModalComponent,
      id: Constants.createNdefAbsoluteUriRecordModalId,
      cssClass: 'modal-fullscreen',
    });
    await this.closeModal();
  }

  public async openCreateNdefMimeMediaRecordModal(): Promise<void> {
    await this.dialogService.showModal({
      component: CreateNdefMimeMediaRecordModalComponent,
      id: Constants.createNdefMimeMediaRecordModalId,
      cssClass: 'modal-fullscreen',
    });
    await this.closeModal();
  }

  public async openCreateNdefExternalRecordModal(): Promise<void> {
    await this.dialogService.showModal({
      component: CreateNdefExternalRecordModalComponent,
      id: Constants.createNdefExternalRecordModalId,
      cssClass: 'modal-fullscreen',
    });
    await this.closeModal();
  }

  public async openCreateNdefAndroidApplicationRecordModal(): Promise<void> {
    await this.dialogService.showModal({
      component: CreateNdefAndroidApplicationRecordModalComponent,
      id: Constants.createNdefAndroidApplicationRecordModalId,
      cssClass: 'modal-fullscreen',
    });
    await this.closeModal();
  }
}
