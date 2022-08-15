import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NfcService, PlatformService } from '@app/core';
import { ViewDidEnter, ViewWillLeave } from '@ionic/angular';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { take } from 'rxjs';

@UntilDestroy()
@Component({
  selector: 'app-read',
  templateUrl: './read.page.html',
  styleUrls: ['./read.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReadPage implements ViewDidEnter, ViewWillLeave {
  public scannedTag$ = this.nfcService.scannedTag$;

  constructor(
    private readonly nfcService: NfcService,
    private readonly platformService: PlatformService,
  ) {}

  public ionViewDidEnter(): void {
    this.nfcService.startScanSession();
    this.subscribeToObservables();
  }

  public ionViewWillLeave(): void {
    this.nfcService.stopScanSession();
  }

  private subscribeToObservables(): void {
    if (this.platformService.isIos()) {
      this.nfcService.scannedTag$
        .pipe(take(1), untilDestroyed(this))
        .subscribe(() => this.nfcService.stopScanSession());
    }
  }
}
