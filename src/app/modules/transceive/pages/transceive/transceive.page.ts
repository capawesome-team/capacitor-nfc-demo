import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
} from '@angular/core';
import {
  DialogService,
  NfcService,
  PlatformService,
  TimeoutService,
} from '@app/core';
import { HexToBytesPipe } from '@app/shared/pipes';
import { NfcTagTechType } from '@capawesome-team/capacitor-nfc';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Subject, take, takeUntil } from 'rxjs';

@UntilDestroy()
@Component({
  selector: 'app-transceive',
  templateUrl: './transceive.page.html',
  styleUrls: ['./transceive.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [HexToBytesPipe],
})
export class TransceivePage {
  public readonly techType = NfcTagTechType;

  public selectedTechType: NfcTagTechType | undefined;
  public selectedCommand: string | undefined;
  public transceiveResponse: number[] | undefined;

  private readonly cancelSubject = new Subject<void>();
  private readonly cancel$ = this.cancelSubject.asObservable();
  private activeWriterAlert: HTMLIonAlertElement | undefined;

  constructor(
    private readonly nfcService: NfcService,
    private readonly dialogService: DialogService,
    private readonly timeoutService: TimeoutService,
    private readonly platformService: PlatformService,
    private readonly hexToBytesPipe: HexToBytesPipe,
    private readonly changeDetectorRef: ChangeDetectorRef,
  ) {}

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
    await this.showWriterAlert();
    this.nfcService.scannedTag$
      .pipe(takeUntil(this.cancel$), take(1), untilDestroyed(this))
      .subscribe(async () => {
        if (!this.selectedTechType || !this.selectedCommand) {
          return;
        }
        const data = this.hexToBytesPipe.transform(
          this.selectedCommand,
          '',
          ':',
        );
        this.transceiveResponse = await this.nfcService.transceive(
          this.selectedTechType,
          data,
        );
        this.changeDetectorRef.detectChanges();
        this.activeWriterAlert?.dismiss();
        await this.nfcService.stopScanSession();
      });
  }

  private async showWriterAlert(): Promise<void> {
    if (this.platformService.isIos()) {
      return;
    }
    this.activeWriterAlert = await this.dialogService.showAlert({
      header: 'Write',
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
