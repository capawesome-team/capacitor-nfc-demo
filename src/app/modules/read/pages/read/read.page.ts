import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NfcService, PlatformService } from '@app/core';
import { NfcTag } from '@capawesome-team/capacitor-nfc';
import { ViewDidEnter, ViewWillLeave } from '@ionic/angular';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Observable, take } from 'rxjs';

@UntilDestroy()
@Component({
  selector: 'app-read',
  templateUrl: './read.page.html',
  styleUrls: ['./read.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReadPage implements ViewDidEnter, ViewWillLeave {
  public scannedTag$: Observable<NfcTag>;

  private showLastScannedTag = false;

  constructor(
    private readonly nfcService: NfcService,
    private readonly platformService: PlatformService,
    private readonly activatedRoute: ActivatedRoute,
  ) {
    this.showLastScannedTag =
      this.activatedRoute.snapshot.queryParams.showLastScannedTag === 'true';
    this.scannedTag$ = this.showLastScannedTag
      ? this.nfcService.lastScannedTag$
      : this.nfcService.scannedTag$;
  }

  public ionViewDidEnter(): void {
    this.nfcService.startScanSession();
    this.subscribeToObservables();
  }

  public ionViewWillLeave(): void {
    this.nfcService.stopScanSession();
  }

  private subscribeToObservables(): void {
    if (this.platformService.isIos()) {
      this.scannedTag$
        .pipe(take(1), untilDestroyed(this))
        .subscribe(() => this.nfcService.stopScanSession());
    }
  }
}
