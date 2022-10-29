import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
} from '@angular/core';
import { Constants } from '@app/config';
import {
  DialogService,
  NdefRecordsService,
  NfcService,
  PlatformService,
  TimeoutService,
} from '@app/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { CreateNdefRecordModalComponent } from '../../components';

@UntilDestroy()
@Component({
  selector: 'app-write',
  templateUrl: './write.page.html',
  styleUrls: ['./write.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WritePage {
  public readonly records$ = this.ndefRecordsService.records$;

  private readonly cancelSubject = new Subject<void>();
  private readonly cancel$ = this.cancelSubject.asObservable();
  private activeWriterAlert: HTMLIonAlertElement | undefined;

  constructor(
    private readonly nfcService: NfcService,
    private readonly dialogService: DialogService,
    private readonly timeoutService: TimeoutService,
    private readonly platformService: PlatformService,
    private readonly ndefRecordsService: NdefRecordsService,
    private readonly changeDetectorRef: ChangeDetectorRef,
  ) {}

  public removeNdefRecordAtIndex(index: number): void {
    this.ndefRecordsService.removeNdefRecordAtIndex(index);
  }

  public async openCreateNdefRecordModal(): Promise<void> {
    await this.dialogService.showModal({
      component: CreateNdefRecordModalComponent,
      id: Constants.createNdefRecordModalId,
      cssClass: 'modal-fullscreen',
    });
  }

  public async startWriterSession(): Promise<void> {
    try {
      await this.nfcService.startScanSession();
    } catch (error) {
      throw error;
    } finally {
      /**
       * **Workaround**
       *
       * The error dialog is not consistently presented and you had to interact
       * with the page first (e.g. by random click) for the alert to show up.
       */
      this.timeoutService.timeout(
        () => this.changeDetectorRef.detectChanges(),
        1,
      );
    }
    await this.showScanSessionAlert({ header: 'Write' });
    this.nfcService.scannedTag$
      .pipe(takeUntil(this.cancel$), take(1), untilDestroyed(this))
      .subscribe(async () => {
        const records = this.ndefRecordsService.getRecords();
        await this.nfcService.write({ records });
        this.activeWriterAlert?.dismiss();
        await this.nfcService.stopScanSession();
      });
  }

  public async erase(): Promise<void> {
    try {
      await this.nfcService.startScanSession();
    } catch (error) {
      throw error;
    } finally {
      /**
       * **Workaround**
       *
       * The error dialog is not consistently presented and you had to interact
       * with the page first (e.g. by random click) for the alert to show up.
       */
      this.timeoutService.timeout(
        () => this.changeDetectorRef.detectChanges(),
        1,
      );
    }
    await this.showScanSessionAlert({ header: 'Erase' });
    this.nfcService.scannedTag$
      .pipe(takeUntil(this.cancel$), take(1), untilDestroyed(this))
      .subscribe(async () => {
        await this.nfcService.erase();
        this.activeWriterAlert?.dismiss();
        await this.nfcService.stopScanSession();
      });
  }

  public async format(): Promise<void> {
    try {
      await this.nfcService.startScanSession();
    } catch (error) {
      throw error;
    } finally {
      /**
       * **Workaround**
       *
       * The error dialog is not consistently presented and you had to interact
       * with the page first (e.g. by random click) for the alert to show up.
       */
      this.timeoutService.timeout(
        () => this.changeDetectorRef.detectChanges(),
        1,
      );
    }
    await this.showScanSessionAlert({ header: 'Format' });
    this.nfcService.scannedTag$
      .pipe(takeUntil(this.cancel$), take(1), untilDestroyed(this))
      .subscribe(async () => {
        await this.nfcService.format();
        this.activeWriterAlert?.dismiss();
        await this.nfcService.stopScanSession();
      });
  }

  private async showScanSessionAlert(options: {
    header: string;
  }): Promise<void> {
    if (this.platformService.isIos()) {
      return;
    }
    this.activeWriterAlert = await this.dialogService.showAlert({
      header: options.header,
      message: 'Touch the NFC tag.',
      backdropDismiss: false,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            this.stopWriterSession();
          },
        },
      ],
    });
  }

  private stopWriterSession(): void {
    this.cancelSubject.next(undefined);
    this.nfcService.stopScanSession();
  }
}
